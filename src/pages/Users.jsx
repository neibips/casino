import React from "react";
import UserCard from "../components/UserCard";
import Layout from "../layout";
import Container from "../layout/Container";

const Users = () => {
  return (
      <Layout>
        <Container parentClass="body-coming-soon">
          <h1 className="text-center py-5 my-5 display-4">Coming Soon</h1>
        </Container>
      </Layout>
    /*<Layout>
      <Container parentClass="body-users">
        <div className="form-select-container mt-4">
          <select
            className="form-select active_btn text-white fw-light px-4"
            aria-label="Default select example"
          >
            <option className="text-dark" value="1">
              RECENT
            </option>
            <option className="text-dark" value="2">
              LIVE
            </option>
            <option className="text-dark" value="3">
              TOP
            </option>
          </select>
        </div>

        <div className="mt-5 mt-md-0">
          <h1 className="display-5 text-uppercase text-center fw-bold">
            <span className="color3">57</span> Active Flippers
          </h1>
          <p className="text-center text-uppercase h5 mt-4 fw-bold">
            These users have done at least one flip in the last 20 minutes.
          </p>
          <br />
          <br className="d-none d-md-block" />
          <hr />
          <br className="d-none d-md-block" />
          <br />
          <div className="row gx-4 gy-5 gx-md-5">
            <div className="col-12 col-lg-6">
              <div className="row gx-3 gx-md-5 gy-3 gy-md-4">
                {[1, 1, 1, 1, 1, 1].map((res, i) => {
                  return (
                    <div key={i} className="col-6">
                      <UserCard won />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row gx-3 gx-md-5 gy-3 gy-md-4">
                {[1, 1, 1, 1, 1, 1].map((res, i) => {
                  return (
                    <div key={i} className="col-6">
                      <UserCard lost />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </Container>
    </Layout>*/
  );
};

export default Users;
