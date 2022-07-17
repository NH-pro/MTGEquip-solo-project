import { Grid, Stack, Typography, Card, Button } from "@mui/material";
import { useHistory } from "react-router-dom";


function About() {
    const history = useHistory();


    return (
        <>
            <Button
                onClick={() => history.push('/')}
                variant="outlined"
                sx={{
                    position: 'fixed',
                    marginTop: '41em',
                    marginLeft: '.5em'
                }}
            >
                Back
            </Button>
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    marginTop: '1em',
                }}
            >
                <Stack 
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                >
                    <Card
                        elevation={4}
                        sx={{
                            padding: '1em',
                            paddingBottom: '.25em',
                            backgroundColor: 'mistyrose'
                        }}
                    >
                        <Stack>
                            <Typography
                                variant="h5" 
                            >
                                Technologies Used:
                            </Typography>
                            <Typography
                                variant="h6"
                            >
                                <ul>
                                    <li>Javascript</li>
                                    <li>Node.js</li>
                                    <li>Express</li>
                                    <li>React</li>
                                    <li>Redux</li>
                                    <li>Redux-Saga</li>
                                    <li>Moment</li>
                                    <li>Passport</li>
                                    <li>Material UI</li>
                                </ul>
                            </Typography>

                        </Stack>
                    </Card>
                    <Card
                        elevation={4}
                        sx={{
                            padding: '1em',
                            paddingBottom: '.25em',
                            backgroundColor: 'lavender'
                            
                        }}
                    >
                        <Stack>
                            <Typography
                                variant="h5"
                            >
                                Thank you
                            </Typography>
                            <Typography
                                variant="h6"
                            >
                                <ul>
                                    <li>Friends</li>
                                    <li>Family</li>
                                    <li>Gaiman Cohort</li>
                                    <li>Edan</li>
                                </ul>
                            </Typography>

                        </Stack>
                    </Card>
                </Stack>
            </Grid>
        </>
        
    )
}
export default About;