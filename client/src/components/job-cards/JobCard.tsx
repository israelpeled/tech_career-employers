import React from "react";
import styled from "styled-components";

import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

const { Meta } = Card;

export default function JobCard({title,company,location,applicants,id}:any) {
  return (
    <Container>
      <Link to={`/recruiter/${id}`}>
        <Card style={{ padding: 5, cursor: "pointer"}}>
          <Meta
            avatar={<Avatar src="/img/checkpoint.png" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}  />}
            title={title}
             description={company}
          />
         
          <p>{location}</p>
          <p>{applicants}</p>
        </Card>
      </Link>
    </Container>
  
  );

}


const Container = styled.div`
text-align: left;
&:hover{
  /* background-color: gray !important; */

}
`
