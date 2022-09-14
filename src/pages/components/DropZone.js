import React, { Fragment, Component } from "react";

import { Grid, List, ListItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import Dropzone from "react-dropzone";

export default class LivePreviewExample extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  onDrop(files) {
    this.props.parentCallback(files);

    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: [],
    });
  }

  render() {
    const files = this.state.files.map((file) => (
      <ListItem key={file.name}>
        {file.name} - {file.size} bytes
      </ListItem>
    ));

    return (
      <Fragment>
        <MuiAlert severity="warning">
          Here you can drop your files (.png, .jpg, .jpeg, .mp4, .mov, .avi)
        </MuiAlert>
        <Grid container spacing={4} className="mt-4">
          <Grid item xs={12} sm={6}>
            <div className="dropzone">
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                onFileDialogCancel={this.onCancel.bind(this)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="dz-message">
                      <div className="dx-text">
                        Drop your files in here
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="w-100">
              {this.state.files.length === 0 &&
                (console.log(this.state.files.length),
                (
                  <MuiAlert severity="success">
                    Files uploaded will appear here!
                  </MuiAlert>
                ))}
              {this.state.files.length > 0 && (
                <List>
                  <ListItem className="font-weight-bold text-center">
                    Uploaded Files
                  </ListItem>
                  {files}
                </List>
              )}
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
