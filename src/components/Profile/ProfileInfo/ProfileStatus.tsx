import React from "react";


type ProfileStatusPropsType = {
  status: string
  updateStatus: (status: string) => void
}

type ProfileStatusStateType = {
  editMode: boolean,
  status: string,
}

class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({editMode: true}) 

  }

  deactivateEditMode = () => {
    this.setState({editMode: false});
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({status: e.currentTarget.value});
  }

  componentDidUpdate (prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status})
    }

    console.log('compdidupdate');
  }
  
  render() {    
    console.log('render');
    return (
      <div>
        {!this.state.editMode && 
          <div>
            <span onClick={this.activateEditMode}>{this.props.status || '---------'}</span>
          </div>
        }
        {this.state.editMode && 
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
          </div>
        }
      </div>
    );
  }
}

export default ProfileStatus;
