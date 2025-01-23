import sinon from "sinon";
import chai from "chai";
import bcrypt from "bcryptjs";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import User from "../database/models/UserModel";
import userMock from "./mocks/userMock";

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', ()=>{
  beforeEach(async () => {
    sinon.stub(User, "findOne").resolves({ ...userMock } as User);
    sinon.stub(bcrypt, "compare").resolves(true);
  });

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  });

  it("testando login Valido", async () => {
    const email = userMock.email;
    const password = userMock.password;
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email, password });

    expect(result.status).to.be.equal(200);
    expect(result.body).have.property("token");
  });

  it("testando login invalido", async () => {
    const email = "";
    const password = "";
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email, password });
    
    expect(result.status).to.be.equal(400);
    expect(result.text).to.be.deep.equal('{"message":"All fields must be filled"}');
  });

  it("testando subrota role da rota login (/login/role)", async ()=>{
    const email = userMock.email;
    const password = userMock.password;
    const generateToken = await chai
      .request(app)
      .post("/login")
      .send({ email, password });
    const token = generateToken.body.token;
    const result = await chai
    .request(app)
    .get("/login/role")
    .set({ 'Authorization': token });

    expect(result.status).to.be.equal(200);
    expect(result.body).have.property("role");
  })
})