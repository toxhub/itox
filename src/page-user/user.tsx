import * as React from 'react';


export default class User extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    componentWillMount(){
        console.log('props',this.props);
    }
    render() {
        return(
          <div>
              <h1>Users</h1>
          </div>
        );
    }
}
