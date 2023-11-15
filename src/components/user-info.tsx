import React from "react";
import { GetUserInfoReturns } from "zmp-sdk";
import { Avatar, Box, Text } from "zmp-ui";
import { userState } from "../state";
import { User } from "../interface/User";

//For User from Data base
const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="section-cotainer">
      <Box ml={4}>
        <Text.Title placeholder="name" label="name">
          {user.userName}
        </Text.Title>
        <Text>Phòng {user.roomNumber}</Text>
      </Box>
    </div>
  );
};

export default UserInfo;
