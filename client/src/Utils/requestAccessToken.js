import axios from "axios";

export async function requestAccessToken() {
  if (localStorage.getItem("refreshToken")) {
    console.log("1")
    try {
      const body = {"token" : localStorage.getItem("refreshToken")}
      const res = await axios
        .post("/token", body)

      if (res.status === 200) {
        var token = await res.data.accessToken;
        localStorage.setItem("accessToken", token);
        console.log("true")
        return true;
        // return Promise.resolve(true);
      }
      else {
        console.log("else")
        return false;

        // return Promise.resolve(false);
      }
    }catch(err) {
        console.log("eroor" + err)
        return false;
        // return Promise.resolve(false);
    }

    }

  else return false;

}