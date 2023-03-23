// Import required modules and components
import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "@/Components/Layout";

// Set the API key
const API_KEY = "1606a73c988e4b63b2f84de57dab8ef2";

// Define the content component
const Content = ({ user }) => {
  // Render the component
  return (
    <Layout>
      <Container style={{ marginTop: "30px" }}>
        <Row className="justify-content-center my-4">
          {user ? (
            <Col md={8}>
              <h1>{user.title}</h1>
              <img src={user.img} className="img-fluid my-4" alt={user.title} />
              <p
                className="font-weight-bold"
                style={{ fontWeight: "400", fontSize: "18px" }}
              >
                {user.description}
              </p>
            </Col>
          ) : (
            <Col md={8}>
              <h1>No article found</h1>
            </Col>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

// Fetch data from server-side
export async function getServerSideProps(context) {
  try {
    // Call the News API with the given query
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&pageSize=1&q=${context.query.id}&apiKey=${API_KEY}`
    );

    // Extract data from the response
    const data = response.data;

    // Check if data exists and is not empty
    if (data.articles && data.articles.length > 0) {
      // Return the user object as props
      return {
        props: {
          user: {
            title: data.articles[0].title,
            description: data.articles[0].description,
            img: data.articles[0].urlToImage,
          },
        },
      };
    } else {
      // Return null as user object
      return { props: { user: null } };
    }
  } catch (error) {
    // Log the error and return null as user object
    console.error(error);
    return { props: { user: null } };
  }
}

// Export the content component as default
export default Content;
