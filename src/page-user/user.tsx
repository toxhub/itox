import * as React from 'react';


export default class User extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    componentWillMount(){
        console.log('props',this.props);
    }

    login(){
        const {history} = this.props;
        history.push({
            pathname:'/home'
        })
    }

    render() {
        return(
          <div>
              <h1>Users</h1>
          </div>
        );
    }
}
