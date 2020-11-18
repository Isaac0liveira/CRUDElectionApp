package t2

import grails.converters.JSON


class CandidatoController {

    CandidatoService CandidatoService

    def index(){
        def model = [:]
        model.put('candidato', CandidatoService.index())
        respond model
    }

    def votar(){
        def model = [:]
        model.put('candidato', CandidatoService.votar(params.numero as String))
        render model as JSON
    }

    def cadastrar(){
        def model = [:]
        model.put('message', CandidatoService.cadastrar(
                params.nome as String,
                params.numero as String,
                params.tipo as String))
        render model as JSON
    }

    def deletar(){
        def model = [:]
        model.put('message', CandidatoService.deletar(
                params.id as String))
        render model as JSON
    }

    def editar(){
        def model = [:]
        model.put('message', CandidatoService.editar(
                params.id as String,
                params.nome as String,
                params.numero as String,
                params.tipo as String))
        render model as JSON
    }

    def procurar(){
        def model = [:]
        model.put('candidato', CandidatoService.procurar(
                params.numero as String))
        render model as JSON
    }
}