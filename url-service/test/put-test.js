import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import Url from '../models/UrlModel.js'
import { errorPrefix, OperationError, RequestError, RouteError, ValidationError } from '../utils/errors.js';
import { ResponseMessage } from '../utils/messages.js';
import { urls } from "./dummy.js" 

let should = chai.should();

chai.use(chaiHttp);

describe('Test /PUT route with valid and invalid input', () => {
    beforeEach((done) => {
        Url.deleteMany({}, (err) => {
            done();
        })
        Url.insertMany(urls.map((url) => {
            const { urlCode, longUrl } = url;
            return {
                urlCode,
                longUrl,
                "date": new Date()
            }
        }))
    })

    describe('Valid body for /PUT should update an existing URL', () => {
        it('it should PUT an existing url', (done) => {
          chai.request(app)
              .put(`/api/url/update/${urls[1].urlCode}`)
              .send({
                  "longUrl": urls[2].longUrl
                })
              .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.eql(ResponseMessage.URL_EDIT_SUCCESS)
                done();
              });
        });
    });

    describe('Invalid body for /PUT should not update any URL', () => {
        it('it should not POST a new url if body is invalid', (done) => {
          chai.request(app)
              .put(`/api/url/update/${urls[1].urlCode}`)
              .send({
                  "invalidBody": "invalidBody"
              })
              .end((err, res) => {
                    res.should.have.status(400);
                    should.exist(res.body);
                    res.body.should.be.eql(RequestError.LONG_URL_NOT_PROVIDED);
                done();
              });
        });

        it('it should not PUT a new url if long url is the same', (done) => {
            chai.request(app)
                .put(`/api/url/update/${urls[1].urlCode}`)
                .send({
                    "longUrl": urls[1].longUrl
                })
                .end((err, res) => {
                      res.should.have.status(200);
                      should.exist(res.body);
                      res.body.should.be.eql(ResponseMessage.URL_NOT_DIFFERENT);
                  done();
                });
          });

        it('it should not PUT a new url if body is invalid', (done) => {
            chai.request(app)
                .put(`/api/url/update/${urls[1].urlCode}`)
                .send({
                    "longUrl": "invalidBody"
                })
                .end((err, res) => {
                      res.should.have.status(400);
                      should.exist(res.body);
                      res.body.should.be.eql(errorPrefix + ValidationError.INVALID_LONG_URL);
                  done();
                });
          });

        it('it should not PUT a new url if body is empty', (done) => {
            chai.request(app)
                .put(`/api/url/update/${urls[1].urlCode}`)
                .send({})
                .end((err, res) => {
                      res.should.have.status(400);
                      should.exist(res.body);
                      res.body.should.be.eql(RequestError.LONG_URL_NOT_PROVIDED);
                  done();
                });
          });
    });

    describe('Invalid route for /PUT should return a 404', () => {
        it('it should return 404 if route is invalid', (done) => {
          chai.request(app)
              .put('/')
              .send({
                "longUrl": urls[2].longUrl
              })
              .end((err, res) => {
                    res.should.have.status(404);
                    should.exist(res.body);
                    res.body.should.be.eql(RouteError.INVALID_ENDPOINT);
                done();
              });
        });
    });

    describe('Invalid urlcode for /PUT should not update url', () => {
        it('it should not POST a new url if urlcode does not exist', (done) => {
          chai.request(app)
              .put(`/api/url/update/invalidUrlCode`)
              .send({
                "longUrl": urls[2].longUrl
              })
              .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.eql(ResponseMessage.URL_NOT_FOUND);
                done();
              });
        });
    });
})

