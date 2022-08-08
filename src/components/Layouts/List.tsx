import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import { ListItemButton, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface Data {
    requestId:string;
    title: string;
    date: string;
    requestStatus:string
}

interface RequestList {
    requests: Data[];
    title: string
}

export default function FolderList({ title, requests }: RequestList) {
    const navigate = useNavigate()
    return (
        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 300 }}>
            <Typography sx={{ mb: 1 }} variant="h6" component="div">
                {title}
            </Typography>

            {requests.map((request, index) => {
                return (
                    <ListItemButton key={index} onClick={() => navigate(`/requests/${request?.requestId}`)} >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${request.title} (${request.requestStatus})`} secondary={moment(request.date).format('LLLL')} />
                        </ListItem>
                    </ListItemButton>

                )
            })}
        </List>
    );
}
