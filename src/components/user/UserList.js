import React, { Component } from 'react';
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';

import { getUsers, getUserToken } from '../../store/user';
import { getImage } from '../../store/images';
import { typeUser } from '../../services/userService';

import UserInfo from './UserInfo';
import DefaultUser from '../../img/default_user.png';

const pStyle = {
    fontSize: 16,
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
      }}
    >
      <p
        className="site-description-item-profile-p"
        style={{
          marginRight: 8,
          display: 'inline-block',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );

class UserList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            visible: false
        }
    }
    
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };

      onClose = () => {
        this.setState({
          visible: false,
        });
      };

    async componentDidMount() {
        const token = getUserToken();
        let users = await getUsers(token);
        let imageUser = null;
        let final_users = { users: [] }

        for(let aux = 0; aux < users.length; aux ++) {
            if(users[aux].image === null) {
                users[aux].image = DefaultUser;
            } else {
                imageUser = await getImage(token, users[aux].image);
                users[aux].image = imageUser.image;                
            }
            final_users.users.push({
                id: users[aux].id,
                name: users[aux].name,
                email: users[aux].email,
                ramal: users[aux].ramal,
                image: users[aux].image,
                setor: 'Não Feito',
                is_administrator: users[aux].is_administrator
            });
        }
        this.setState({ users: final_users.users });
    }

    render() {
        let data = { users: [] };
        let typePermission = null;

        for(let aux = 0; aux < this.state.users.length; aux ++) {
            typePermission = typeUser(this.state.users[aux].is_administrator);
            data.users.push({
                key: this.state.users[aux].id,
                name: this.state.users[aux].name,
                email: this.state.users[aux].email,
                ramal: this.state.users[aux].ramal,
                image: this.state.users[aux].image,
                description: 'Não Feito',
                sector: 'Não Feito',
                permission: typePermission
            });
        }
        return (
            <div>
                <List
                    dataSource = { data.users } pagination = {{ defaultPageSize: 4 }} 
                    bordered className = 'userList'
                    renderItem = { user => (
                        <List.Item
                            key = { user.key }
                            actions = {[
                                <a onClick = { this.showDrawer } key = {`a-${ user.key }`}>
                                    Visualizar Perfil
                                </a>,
                            ]}
                        >
                        <List.Item.Meta
                            avatar = { <Avatar src = { user.image } /> }
                            title = { user.name}
                            description = { user.description }
                        />
                        </List.Item>
                    )}
                />
            <Drawer
              width={640}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
                User Profile
              </p>
              <p className="site-description-item-profile-p" style={pStyle}>
                Personal
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Full Name" content="Lily" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Account" content="AntDesign@example.com" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="City" content="HangZhou" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Country" content="China🇨🇳" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Birthday" content="February 2,1900" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Website" content="-" />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="Message"
                    content="Make things as simple as possible but no simpler."
                  />
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p" style={pStyle}>
                Company
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Position" content="Programmer" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Responsibilities" content="Coding" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Department" content="XTech" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="Skills"
                    content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                  />
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p" style={pStyle}>
                Contacts
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Email" content="AntDesign@example.com" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="Github"
                    content={
                      <a href="http://github.com/ant-design/ant-design/">
                        github.com/ant-design/ant-design/
                      </a>
                    }
                  />
                </Col>
              </Row>
            </Drawer>
          </div>
        );
      }    
}
export default UserList;