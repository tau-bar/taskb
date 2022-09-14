import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../index.js';
import Url from '../models/UrlModel.js'
import { urls } from "./dummy.js" 

let should = chai.should();

chai.use(chaiHttp);



describe('Create a new URL', () => {
    beforeEach((done) => {
        Url.deleteMany({}, (err) => {
            console.log("test")
            done();
        })
    })

    /**
     * Test /POST route
     */
    describe('/POST url', () => {
        it('it should POST a new url', (done) => {
          chai.request(app)
              .post('/api/url/create')
              .send(urls[0])
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.urlCode.length.should.be.eql(9);
                    res.body.longUrl.should.be.eql(urls[0].longUrl);
                done();
              });
        });
    });

    // describe('/POST url', () => {
    //     it('it should not POST a new url if body is invalid', (done) => {
    //       chai.request(app)
    //           .post('/api/url/create')
    //           .send({})
    //           .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.urlCode.length.should.be.eql(9);
    //                 res.body.longUrl.should.be.eql(urls[0].longUrl);
    //             done();
    //           });
    //     });
    // });
})

