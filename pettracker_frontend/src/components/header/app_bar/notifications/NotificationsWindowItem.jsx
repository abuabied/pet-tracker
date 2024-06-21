import { Container, List, ListItem } from "@mui/material";

export const NotificationsWindowItem = ({ notification }) => {
  return (
    <List>
      <ListItem>
        <h4>{notification?.notification.title}</h4>
      </ListItem>
      <Container sx={{ display: "flex" }}>
        <ListItem>
          <h4>{notification?.recievedTime}</h4>
        </ListItem>
        <ListItem>
          <h4>{notification?.notificationContent}</h4>
        </ListItem>
      </Container>
    </List>
  );
};
