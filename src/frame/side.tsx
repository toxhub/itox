import React, {Component} from 'react'
import {observable, toJS, action} from 'mobx'
import {observer} from 'mobx-react'
import {Tooltip} from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import shouSvg from '../assets/svg/shou.svg'
import zhanSvg from '../assets/svg/zhan.svg'
import jiantouSvg from '../assets/svg/jiantou.svg'
import submenu from './submenu'
import {checkAuthCode} from '../common/utils'

// 颜色组，映射styl
const colorArr = [
  '#FFC2D9',
  '#FFC8C2',
  '#FFE6C2',
  '#FFFDC2',
  '#E8FFC2',
  '#CAFFC2',
  '#C2FFE3',
  '#C2EEFF',
  '#C2D9FF',
  '#CCC2FF',
]

@observer
class Side extends Component {
  @observable userDrop = false

  // 渲染左侧栏子菜单
  // 渲染左侧栏子菜单
  renderChildren(sideParent, url, parent) {
    if (!sideParent || !sideParent.children || sideParent.children.length === 0) {
      return null
    }
    const {history, system, location} = this.props
    const children = sideParent.children
    const {pathname} = location

    return (
      <div
        className={classnames({
          'submenu': true,
          'mouse-menu': true,
          'submenu-child': parent,
        })}
      >
        <ul>
          {
            children.map(child => {
              let curl = child.url
              if (window.pathPrefix && curl && curl.charAt(0) === '/') {
                curl = `${window.pathPrefix}${curl}`
              }
              const thisProduct = system === (parent || sideParent).code && pathname.indexOf(curl) === 0
              return (
                <li
                  key={child.url}
                  className={classnames({
                    active: thisProduct,
                  })}
                >
                  <div
                    className="subtitle"
                    role="button"
                    tabIndex="0"
                    onKeyPress={() => {}}
                    onClick={action(() => {
                      return history.push(curl)
                    })}
                  >
                    {child.name}
                  </div>
                  {child.children && child.children.length > 0 ? [
                    <img
                      alt=""
                      height={8}
                      src={jiantouSvg}
                    />,
                    this.renderChildren(child, url || sideParent.url, parent || sideParent),
                  ] : null}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    // system 表示当前活跃的
    const {
      sideList, system, store, onCollapsedChange
    } = this.props
    const {collapsed, changeCollapsed} = store
    const subMenuObj = toJS(store.subMenuObj) || {}

    return (
      <div
        className={classnames({
          'side': true,
          'collapsed': !!collapsed,
        })}
      >
        <div className="side-list">
          {
            sideList.map((sideParent: any, index: number) => (
              <Tooltip
                key={sideParent.url || '/'}
                placement="right"
                title={collapsed || (sideParent.children && sideParent.children.length > 0) || (submenu[sideParent.code]) ? '' : sideParent.name}
              >
                <div
                  className={classnames({
                    'side-item': true,
                    'mouse-menu': true,
                    [`side-color-${index % 10}`]: true,
                    active: sideParent.code === system || (subMenuObj.parent && subMenuObj.parent.code === sideParent.code),
                  })}
                  role="button"
                  tabIndex="0"
                  onMouseEnter={e => {
                    store.mouseEnterParent(e, sideParent, index % 10)
                  }}
                  onMouseLeave={e => {
                    store.mouseLeaveProduct(e)
                  }}
                >
                  <div
                    role="button"
                    tabIndex="0"
                    style={{
                      outline: 'none',
                    }}
                  >
                    {
                      sideParent.icon || sideParent.logo ? [
                        <object
                          data={`${sideParent.icon || sideParent.logo}?color=${colorArr[index % 10]}`}
                          width="20"
                          height="20"
                        />,
                        <div className="side-mask mouse-menu" />,
                      ] : (
                        <svg
                          fill={colorArr[index % 10]}
                          width={20}
                          height={20}
                        >
                          <use xlinkHref={`#${sideParent.svg || sideParent.code}`} />
                        </svg>
                      )
                    }
                    
                    {collapsed ? sideParent.name : ''}

                    {
                      collapsed && sideParent.children && sideParent.children.length > 0 ? (
                        <img
                          alt=""
                          height={8}
                          style={{
                            position: 'absolute',
                            top: 16,
                            right: 8,
                          }}
                          src={jiantouSvg}
                        />
                      ) : null
                    }
                  </div>
                </div>
              </Tooltip>
            ))
          }
        </div>
        <div
          className="collapsed-icon"
          role="button"
          tabIndex="0"
          onKeyPress={() => {}}
          title={collapsed ? '收起' : '展开'}
          onClick={() => {
            changeCollapsed(store, onCollapsedChange)
          }}
        >
          <img
            alt=""
            src={collapsed ? shouSvg : zhanSvg}
          />
        </div>
        {
          subMenuObj.parent ? (
            <div
              className={`pop-submenu side-color-${subMenuObj.index}`}
              style={subMenuObj.style}
              role="button"
              tabIndex="0"
              onMouseEnter={e => {
                store.mouseEnterProductItems(e)
              }}
              onMouseLeave={e => {
                store.mouseLeaveProduct(e)
              }}
            >
              {this.renderChildren(subMenuObj.parent)}
            </div>
          ) : null
        }
      </div>
    )
  }
}
  
export default Side
