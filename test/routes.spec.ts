import supertest from "supertest";
import app from "../src/app";
import sequelize from "../src/db";
import User from "../src/models/User";

describe("Authentication API", () => {
  let refreshToken: string;
  let accessToken: string;

  beforeAll(async () => {
    await User.destroy({ where: { email: "test@mail.ru" } });
  });

  afterAll(async () => {
    await User.destroy({ where: { email: "test@mail.ru" } });
  });

  it("should register a new user", (done) => {
    const registerData = {
      email: "test@mail.ru",
      username: "DanielKaziev",
      password: "test",
    };

    supertest(app)
      .post("/api/auth/registration")
      .send(registerData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("Response body:", res.body);
          return done(err);
        }
        done();
      });
  });

  it("should return accessToken and refreshToken on successful login", (done) => {
    const loginData = { email: "test@mail.ru", password: "test" };

    supertest(app)
      .post("/api/auth/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("Response body:", res.body);
          return done(err);
        }
        expect(res.body).toHaveProperty("accessToken");
        expect(res.body).toHaveProperty("refreshToken");

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;

        done();
      });
  });

  it("should return a new accessToken when refreshToken is provided in cookies", (done) => {
    supertest(app)
      .get("/api/auth/refresh")
      .set("Cookie", [`refreshToken=${refreshToken}`]) // Передача refreshToken через куки
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("Response body:", res.body);
          return done(err);
        }
        expect(res.body).toHaveProperty("accessToken");
        done();
      });
  });

  it("should logout the user and invalidate the refreshToken", (done) => {
    supertest(app)
      .get("/api/auth/logout")
      .set("Cookie", [`refreshToken=${refreshToken}`])
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("Response body:", res.body);
          return done(err);
        }
        done();
      });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
