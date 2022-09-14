import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import Url from '../models/UrlModel.js'
import { OperationError, RouteError } from '../utils/errors.js';
import { ResponseMessage } from '../utils/messages.js';
import { urls } from "./dummy.js" 

let should = chai.should();

chai.use(chaiHttp);

describe('Test /DELETE route with valid and invalid input', () => {
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

    describe('Valid url code for /DELETE should retrieve an existing URL', () => {
        it('it should DELETE an existing url', (done) => {
            chai.request(app)
            .delete(`/api/url/delete/${urls[0].urlCode}`)
            .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.eql(ResponseMessage.URL_DELETE_SUCCESS);
                    done();
            });
        })
          
    });

    describe('Invalid requests /DELETE should not return response redirect', () => {
        it('it should not DELETE if url code does not exist', (done) => {
          chai.request(app)
              .delete('/api/url/delete/invalidUrlCode')
              .end((err, res) => {
                    res.should.have.status(404);
                    should.exist(res.body);
                    res.body.should.be.eql(ResponseMessage.URL_NOT_FOUND);
                done();
              });
        });
    });

    describe('Invalid route for /DELETE should return a 404', () => {
        it('it should return 404 if route is invalid', (done) => {
            chai.request(app)
                .delete('/api/url/')
                .end((err, res) => {
                    res.should.have.status(404);
                    should.exist(res.body);
                    res.body.should.be.eql(RouteError.INVALID_ENDPOINT);
                done();
              });
          });
    });
})

