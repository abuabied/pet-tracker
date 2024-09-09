import { Container, Typography } from "@mui/material";

export const HelpPage = () => {
  const textStyle = {
    fontSize: { xs: "20px", sm: "28px", md: "32px" },
    fontWeight: "200",
    lineHeight: { xs: "30px", sm: "40px", md: "50px" },
    letterSpacing: "3px",
    textAlign: "center",
    padding: { xs: "1rem", sm: "4rem", md: "8rem" },
    color: "white",
  };

  return (
    <Container sx={{ padding: "2rem" }}>
      <h1>To use the services that this app offers, please sign in.</h1>
      <hr></hr>
      <h1>Use suggestions:</h1>
      <h2>Start by adding your pet first. Pet name is the required fiel.</h2>
      <h2>The pet's name will be considered as the pet id, so make sure it is unique.</h2>
      <h2>Same applies for clinic name.</h2>
      <br></br>
      <hr></hr>
      <h1>What's next?</h1>
      <h2>Add your frequently visited clinics.</h2>
      <h2>You can find Pets/Clinics by inserting a keyword in the search bar</h2>
      <h3>And you are ready to go.</h3>
      <br></br>
      <hr></hr>
      <h2>Add visits to the relevant pet, and the clinic you visit in the Visits tab.</h2>
      <h2>When a visit is added, it will automatically be uodated for the related pet.</h2>
      <br></br>
      <hr></hr>
      <h1>Editing:</h1>
      <h2>You can edit account information by clicking on the account circle in the top right corner on the screen, then entering the profile info section.</h2>
      <h2>You can edit clinic's information by entering the Clinics tab, and saving your changes.</h2>
      <h2>Editing pet's information and picture can be done by navigating to Pets tab, and clicking on the target pet's card.</h2>
      <br></br>
      <hr></hr>
      <h1>Thank you for visiting our website, Enjoy!</h1>
    </Container>
  );
};
