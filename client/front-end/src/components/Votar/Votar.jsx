import React from "react"
import {Button, Input, Card} from 'antd';
import axios from 'axios';

export default class Votar extends React.Component {

    constructor() {
        super();
        this.timer = null
    }

    state = {
        mostrarCandidato: false,
        mostrarErro: false,
        tipoCandidato: null,
        nomeCandidato: null,
        numeroCandidato: null,
        mensagemFinal: false,
    }

    getNum(num) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if(num != null){
            axios.get(`http://localhost:8080/candidato/procurar/?numero=${num}`).then(res => {
                if (res.data.candidato) {
                    this.setState({
                        mostrarErro: false,
                        mostrarCandidato: true,
                        tipoCandidato: res.data.candidato.tipo,
                        nomeCandidato: res.data.candidato.nome,
                        numeroCandidato: res.data.candidato.numero,
                        mensagemFinal: false
                    })
                } else {
                    this.setState({
                        mostrarErro: true,
                        mostrarCandidato: false,
                        tipoCandidato: null,
                        nomeCandidato: null,
                        numeroCandidato: null,
                        mensagemFinal: false
                    })
                }
            })}
        }, 1250)
    }

    votar(numero){
        if(numero != null) {
            axios.post('http://localhost:8080/candidato/votar', `numero=${numero}`).then(res => {
                if(res) {
                    this.setState({mensagemFinal: true})
                    this.timer = setTimeout(() => this.setState({mensagemFinal: false}), 2000)
                }
            })
        }
    }

    render() {
        return (
            <div style={{fontSize: "2rem", fontWeight: 400, marginTop: 20}}>
                Digite o número do seu Candidato!
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                    <Card style={{width: '90%', borderRadius: '15px'}}>
                        <Input placeholder="Digite o número do seu Candidato!"
                               onChange={e => this.getNum(e.target.value)}/>
                    </Card>
                </div>

                <div style={{
                    display: (this.state.mostrarErro ? 'block' : 'none'),
                    fontSize: "2rem",
                    fontWeight: 600,
                    marginTop: 20
                }}>
                    Candidato não encontrado! Verfique o número e tente novamente.
                </div>

                <div style={{
                    display: (this.state.mostrarCandidato ? 'block' : 'none'),
                    fontSize: "2rem",
                    fontWeight: 600,
                    marginTop: 20
                }}>
                    Candidato a {this.state.tipoCandidato}
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20}}>

                        <div style={{display: 'flex', justifyContent: 'center'}}>

                            <Card style={{display: 'flex', justifyContent: 'center', borderRadius: '15px', width: '90%', textAlign: 'left'}}>
                            <span style={{display: 'flex', flexDirection: 'column', fontSize: '1rem'}}>
                                Nome do Candidato:
                                <Input value={this.state.nomeCandidato} readOnly
                                       onChange={e => this.getNum(e.target.value)}/>
                            </span>
                                <span style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: '10px',
                                    fontSize: '1rem'
                                }}>
                                Numero do Candidato:
                                <Input value={this.state.numeroCandidato} readOnly
                                       onChange={e => this.getNum(e.target.value)}/>
                            </span>
                            </Card>

                        </div>

                        <div>
                            <Button style={{color: 'green', background: 'linear-gradient(#ebf5e4, #daf1db)', width: 200}} onClick={() => this.votar(this.state.numeroCandidato)}> Votar </Button>
                        </div>

                        <div style={{
                            display: (this.state.mensagemFinal ? 'block' : 'none'),
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            marginTop: 20
                        }}>
                            Voto computado com sucesso!
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}