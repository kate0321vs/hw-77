import { Card, CardActionArea, CardMedia, CardHeader, CardContent } from "@mui/material";
import {apiUrl} from "../../../../constants.ts";
import Grid from '@mui/material/Unstable_Grid2';

interface Props {
    author: string;
    message: string;
    image: string | null;
}

const NoteItem: React.FC<Props> = ({image, author, message}) => {
    let productImage = null;

    if (image) {
        productImage = apiUrl + '/' + image;
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={4} my={3}>
                <Card>
                    <CardActionArea/>
                    {productImage &&
                        <CardMedia
                            sx={{height: 300}}
                            image={productImage}
                        />}
                    <CardHeader title={author ? author : 'Anonymous'} />
                    <CardContent>
                        {message}
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default NoteItem;