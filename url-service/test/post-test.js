import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import Url from '../models/UrlModel.js'
import { errorPrefix, RequestError, RouteError, ValidationError } from '../utils/errors.js';
import { urls } from "./dummy.js" 

let should = chai.should();

chai.use(chaiHttp);

describe('Test /POST route with valid and invalid input', () => {
    beforeEach((done) => {
        Url.deleteMany({}, (err) => {
            done();
        })
    })

    describe('Valid body for /POST should create a new URL', () => {
        it('it should POST a new url', (done) => {
          chai.request(app)
              .post('/api/url/create')
              .send(urls[0])
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    should.exist(res.body);
                    res.body.urlCode.length.should.be.eql(9);
                    res.body.longUrl.should.be.eql(urls[0].longUrl);
                done();
              });
        });
    });

    describe('Invalid body for /POST should not create a new URL', () => {
        it('it should not POST a new url if body is invalid', (done) => {
          chai.request(app)
              .post('/api/url/create')
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

        it('it should not POST a new url if body is invalid', (done) => {
            chai.request(app)
                .post('/api/url/create')
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

        it('it should not POST a new url if body is empty', (done) => {
            chai.request(app)
                .post('/api/url/create')
                .send({})
                .end((err, res) => {
                      res.should.have.status(400);
                      should.exist(res.body);
                      res.body.should.be.eql(RequestError.LONG_URL_NOT_PROVIDED);
                  done();
                });
          });
    });

    describe('Invalid route for /POST should return a 404', () => {
        it('it should return 404 if route is invalid', (done) => {
          chai.request(app)
              .post('/')
              .send(urls[0])
              .end((err, res) => {
                    res.should.have.status(404);
                    should.exist(res.body);
                    res.body.should.be.eql(RouteError.INVALID_ENDPOINT);
                done();
              });
        });
    });
})

