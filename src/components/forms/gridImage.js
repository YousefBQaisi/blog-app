import React from 'react';
import { Grid, Container, Image } from 'semantic-ui-react';

const TwoSectionGrid = () => {
  return (
    <Container>
      <Grid columns={2} divided className="two-section-grid">
        <Grid.Row>
          <Grid.Column>
            <div className="text-section">
              <h2>Fight Heaven</h2>
              <p>The place to be for every MMA enthusiast <br></br>This a blog to share our thoughts and point of views on fights and what had happened<br></br>please be respectful and follow the rules, we are a family. a fight family</p>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className="image-section">
              <Image src="https://www.mensjournal.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM2NjQyNjQxMDc3Mzkz/ufc-264-mixed-martial-arts-las-vegas-united-states---10-jul-2021.jpg" alt="Image" height="300px" width="250px" fluid />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default TwoSectionGrid;
