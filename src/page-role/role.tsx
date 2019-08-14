import * as React from 'react';


export default class Role extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    componentWillMount(){
        console.log('props',this.props);
    }
    render() {
        return(
          <div>
              <h1>Role</h1>
          </div>
        );
    }
}
