import React, {Component} from 'react'
import {observer} from 'mobx-react'
import _ from 'lodash'

@observer
class Nav extends Component {
  render() {
    const {
      navList = [],  historyVisiable = true, history
    } = this.props
    return (
      <div className="nav fs12">
        {
          navList.map((nav, index) => {
            if (index === navList.length - 1) {
              return nav.text
            }
            if (!nav.text) {
              return null
            }
            let {url} = nav
            if (window.pathPrefix && url && url.charAt(0) === '/') {
              url = `${window.pathPrefix}${url}`
            }
            return (
              <span key={url}>
                {
                  historyVisiable ? (
                    <a onClick={() => history.push(url)}>
                      {nav.text}
                    </a> 
                  ) : (
                    <a href={url}>
                      {nav.text}
                    </a>
                  )
                }
                <span className="nav-split">/</span>
              </span>
            )
          })
        }
      </div>
    )
  }
}
  
export default Nav
