import { expect, it, describe } from "vitest";
import { userMock } from "../../../fixture/user-fixture";
import UserService from "../../../../service/user.service";
import { cryptoService } from "../../../../service/provider";

const userRepository = {};

describe("getUserById", async () => {
  it("Should get a user by id", async () => {
    userRepository.findById = () => ({ ...userMock });

    const sut = new UserService(cryptoService, userRepository);

    const result = await sut.getUserById("1");

    expect(result._id).to.equal("1");
  });
});
