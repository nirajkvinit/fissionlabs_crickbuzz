import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';

function Page404() {
  return (
    <div>
      <section className="full-height">
        <div className="container ">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 text-center mb-4">
              <Link className="navbar-brand" to="/">
                CRICK-BUZZ - React based Cricket Game App
              </Link>
            </div>
            <div className="col-md-12">
              <h3 className="text-center">
                404 page not found! <br />
                <img src="/assets/images/robot404.jpg" alt="" />
              </h3>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Page404;
