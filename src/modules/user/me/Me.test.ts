import { gCall } from '../../../test-utils/gCall';
import { Connection } from 'typeorm';
import { testConn } from '../../../test-utils/testConn';
import faker from 'faker';
import { User } from '../../../entity/User';

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    await conn.close();
});

const meQuery = `{
    me {
     id
      firstName
      lastName
      email
      name
    }
  }`;

describe('Me', () => {
    it('get user', async () => {

        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()

        }).save();



        const response = await gCall({
            source: meQuery,
            userId: user.id
        });

        console.log('response', response);

        expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });

        // user not in the context

    });

    it("return null", async () => {
        const response = await gCall({
            source: meQuery,
        });

        console.log('response', response);

        expect(response).toMatchObject({
            data: {
                me: null
            }
        });

    })

});