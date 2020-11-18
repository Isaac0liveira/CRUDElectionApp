import React from 'react';
import './App.css'
import {BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import {Layout, Menu} from "antd";
import 'antd/dist/antd.css'
import Inicio from "./components/início/Inicio";
import Votar from "./components/Votar/Votar";


const {Header, Content} = Layout;

export default props =>


    <BrowserRouter>
        <Layout className="App">
            <Header className="Header" style={{background: "linear-gradient(#b679f3, #97eaf1)"}}>
                <h2 className="HeaderText">Eleição</h2>
                <Menu mode="horizontal">
                    <Menu.Item key='1'>
                        <NavLink to="/">
                            Início
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <NavLink to="/votar">
                            Votar
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content className='ComponentContent'>
                <Switch>
                    <Route path="/" exact={true} component={Inicio}/>
                    <Route path="/votar" exact={true} component={Votar}/>
                </Switch>
            </Content>
        </Layout>

    </BrowserRouter>


