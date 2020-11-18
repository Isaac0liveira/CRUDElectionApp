import React, {Component} from "react";
import {Table, Button, Form, Input, Space, message, Select, Radio} from 'antd';
import axios from 'axios';

export default class Inicio extends Component {

    state = {
        candidato: this.getCandidatos() || [],
        mostrarCadastro: false,
        editar: null,
        filtro: [],
        valorRadio: "Deputado"
    }


    columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Votos',
            dataIndex: 'votos',
            key: 'votos',
        },
        {
            title: 'Número',
            dataIndex: 'numero',
            key: 'numero',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (record) => (
                <Space style={{display: "flex", flexDirection: "column"}}>
                    <a onClick={(e) =>
                        axios.delete(`http://localhost:8080/candidato/deletar/?id=${record.key}`)
                            .then(res => {
                                this.getCandidatos()
                            })
                    }>Deletar</a>
                    <span style={{display: "flex", margin: '10px'}}>
                    <a onClick={(e) => this.setState({editar: record.key, mostrarCadastro: false})}>Editar</a>
                    </span>
                </Space>
            )
        },
    ];

    getCandidatos() {
        axios.get('http://localhost:8080/candidato')
            .then(res => {
                res.data.candidatos.map(data => {
                    data.key = data.id
                    delete (data.id)
                    data.name = data.nome
                    delete (data.nome)
                })
                res.data.candidatos.sort(function (a, b) {
                    if (a.votos > b.votos) {
                        return -1
                    } else if (a.votos < b.votos) {
                        return 1
                    } else {
                        return 0
                    }
                })
                this.setState({candidato: res.data.candidatos, filtro: res.data.candidatos.filter(x => x.tipo == this.state.valorRadio)})
            })
    }

    async alterarRadio (valor) {
        await this.setState({
            valorRadio: valor
        })
        await this.setState({
            filtro: this.state.candidato.filter(x => x.tipo == this.state.valorRadio)
        })
    }

    render() {

        const salvarDados = values => {
            axios.post('http://localhost:8080/candidato/cadastrar', `nome=${values.nome}&numero=${values.numero}&tipo=${values.tipo}`).then(res => {
                this.getCandidatos()
                this.setState({mostrarCadastro: false})
            })
        };

        const editarDados = values => {
            axios.post('http://localhost:8080/candidato/editar', `id=${this.state.editar}&nome=${values.nome}&numero=${values.numero}&tipo=${values.tipo}`).then(res => {
                this.getCandidatos()
                this.setState({editar: null})
            })
        };

        const cancelar = () => {
            this.setState({mostrarCadastro: false, editar: null})
        }

        const checagem = values => {
            if (this.state.mostrarCadastro) {
                salvarDados(values)
            } else {
                editarDados(values)
            }
        }

        const notificar = () => {
            message.info('Erro ao cadastrar!');
        };

        const { Option } = Select;


        return (
            <div style={{fontSize: "2rem", fontWeight: "lighter", marginTop: 20}}>
                Resultado da Votação
                <div>
                    <Button type="primary" onClick={() => {
                        this.setState({mostrarCadastro: true, editar: null})
                    }}>
                        Adicionar Candidato
                    </Button>
                </div>
                <div>
                    <Radio.Group onChange={e => this.alterarRadio(e.target.value)} value={this.state.valorRadio}>
                        <Radio value="Deputado">Deputado</Radio>
                        <Radio value="Prefeito">Prefeito</Radio>
                        <Radio value="Governador">Governador</Radio>
                        <Radio value="Presidente">Presidente</Radio>
                    </Radio.Group>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Table style={{marginTop: "20px"}} columns={this.columns} dataSource={this.state.filtro}/>
                </div>
                <div style={{
                    display: ((this.state.mostrarCadastro || this.state.editar != null) ? "flex" : "none"),
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <span style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>{this.state.mostrarCadastro ? 'Cadastre um Candidato!' : null}</span>
                    <span style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>{this.state.editar != null ? 'Edite as Informações!' : null}</span>
                    <span style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <Form name="basic"
                          style={{display: 'flex', flexDirection: 'column', justifyContent: "center", width: "80%"}}
                          initialValues={{remember: true,}}
                          onFinish={checagem}>

                        <Form.Item label="Nome" name="nome"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Por favor digite o nome do candidato!',
                                       },
                                   ]}>
                            <Input type='text'/>
                        </Form.Item>
                        <Form.Item label="Numero" name="numero"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Por favor digite o número do candidato!',
                                       },
                                   ]}>
                            <Input type="number"/>
                        </Form.Item>
                        <Form.Item style={{ width: '50%', marginLeft: '25%' }}label="Tipo" name="tipo"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Por favor selecione a modalidade!',
                                       },
                                   ]}>
                            <Select defaultValue="Selecione a Modalidade">
                                <Option value="Deputado">Deputado</Option>
                                <Option value="Prefeito">Prefeito</Option>
                                <Option value="Governador">Governador</Option>
                                <Option value="Presidente">Presidente</Option>
                            </Select>
                        </Form.Item>
                        <div style={{display: "flex", justifyContent: "center"}}>
                        <Button style={{marginRight: "10px", width: "100px"}} type="primary" htmlType="submit">
                            Salvar
                        </Button>
                        <Button style={{marginLeft: "10px", width: "100px"}} type="primary" onClick={e => cancelar()}>
                            Cancelar
                        </Button>
                        </div>
                    </Form>
                    </span>
                </div>
            </div>
        )
    }
}