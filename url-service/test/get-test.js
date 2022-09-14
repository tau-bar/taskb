import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import Url from '../models/UrlModel.js'
import { OperationError, RouteError } from '../utils/errors.js';
import { urls } from "./dummy.js" 

let should = chai.should();

chai.use(chaiHttp);

describe('Test /GET route with valid and invalid input', () => {
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

    describe('Valid url code for /GET should retrieve an existing URL', () => {
        it('it should GET an existing url', (done) => {
            chai.request(app)
            .get(`/api/url/${urls[0].urlCode}`)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.redirects.length.should.eql(1);
                    res.redirects[0].should.eql(urls[0].longUrl);
                    done();
            });
        })
          
    });

    describe('Invalid requests /GET should not return response redirect', () => {
        it('it should not redirect and return 404 if url code does not exist', (done) => {
          chai.request(app)
              .get('/api/url/invalidUrlCode')
              .end((err, res) => {
                    res.should.have.status(404);
                    res.redirects.length.should.eql(0);
                    res.body.should.be.eql(OperationError.URL_NOT_FOUND);
                done();
              });
        });
    });

    describe('Invalid route for /GET should return a 404', () => {
        it('it should return 404 if route is invalid', (done) => {
            chai.request(app)
                .get('/api/url/')
                .end((err, res) => {
                    res.should.have.status(404);
                    should.exist(res.body);
                    res.body.should.be.eql(RouteError.INVALID_ENDPOINT);
                done();
              });
          });
    });
})

