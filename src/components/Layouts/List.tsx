import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';

interface Data {
    title: string;
    date: string;
}

interface RequestList {
    requests: Data[];
}

export default function FolderList({ requests }: RequestList) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, overflow: 'auto', maxHeight: 150 }}>
            {requests.map(request => {
                return (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={request.title} secondary={request.date} />
                    </ListItem>
                )
            })}
        </List>
    );
}
