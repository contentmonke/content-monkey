import {vi} from "vitest"
import axios from "axios"

vi.mock('@auth0/auth0-vue')

describe('Send Friend Request', () => {
    it('request button sends axios message to backend', async () => {
      const loginWithRedirect = vi.fn();
      vi.fn().mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        loginWithRedirect,
      });
    })
  })


describe('Accept friend request', () => {
    it('Accept button clicked and axios message sent', async () => {
      const loginWithRedirect = vi.fn();
      vi.fn().mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        loginWithRedirect,
      });
    })
  })


  // describe('Log In Success', () => {
  //   it('login button invokes useAuth.loginWithRedirect', async () => {
  //     const loginWithRedirect = vi.fn();
  //     vi.fn().mockReturnValue({
  //       isAuthenticated: true,
  //       isLoading: false,
  //       loginWithRedirect,
  //       isHome: true
  //     });
  //   })
  // })

  describe('Log In False', () => {
    it('Views Search Page', async () => {
      const loginWithRedirect = vi.fn();
      vi.fn().mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        loginWithRedirect,
        isHome: false
      });
    })
  })

  // describe('Log In False', () => {
  //   it('login button invokes useAuth.loginWithRedirect', async () => {
  //     const loginWithRedirect = vi.fn();
  //     vi.fn().mockReturnValue({
  //       isAuthenticated: false,
  //       isLoading: false,
  //       loginWithRedirect,
  //       isHome: false
  //     });
  //   })
  //   it("Send data to DB", async () => {
  //      const response = axios.get("http://localhost:8080/api/users/all");
  //      if (response !== null) return true;
  //   })
  // })


  // describe('Log In with OAuth', () => {
  //   it('login button invokes useAuth.loginWithRedirect with OAuth', async () => {
  //     const loginWithRedirect = vi.fn();
  //     vi.fn().mockReturnValue({
  //       isAuthenticated: true,
  //       isLoading: false,
  //       loginWithRedirect,
  //       isHome: true,
  //       isOauth: true
  //     });
  //   })
  // })


// test('adds 1 + 2 to equal 3', () => {
//   expect(1+2).toBe(3)
// })
