import { LinearProgress } from '@mui/material'
import { Box } from '@mui/system'

export default function Loading() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}
