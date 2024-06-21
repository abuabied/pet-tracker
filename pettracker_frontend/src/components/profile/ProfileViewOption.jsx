import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const ProfileViewOption = ({onClickFun = ()=>{}, optionTitle="", icon=<></> }) => {
   return (
     <ListItem onClick={onClickFun}>
       <ListItemButton>
         <ListItemIcon>
           {icon}
         </ListItemIcon>
         <ListItemText primary={optionTitle} />
       </ListItemButton>
     </ListItem>
   );
};
