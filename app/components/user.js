import React from "react";
import { useState } from "react";
import Button from "./ui/button";
function User() {
  const [isLogged, setIslogged] = useState(false);

  return (
    <div className="p-2 m-2 rounded">
      {isLogged ? (
        <div className="flex items-center gap-2">
          <div>Username</div>
          <Button
            callback={() => setIslogged(!isLogged)}
            mood={true}
            text="Logout"
          />
        </div>
      ) : (
        <Button
          callback={() => setIslogged(!isLogged)}
          mood={false}
          text="Login"
        />
      )}
    </div>
  );
}

export default User;
