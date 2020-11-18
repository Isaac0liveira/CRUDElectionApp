package t2

import grails.gorm.services.Service
import org.json.JSONArray

@Service(Candidato)
class CandidatoService {

    def index(){
        def candidato = Candidato.findAll()
        return candidato
    }

    def votar(String numero){
        def candidato = Candidato.findByNumero(Integer.parseInt(numero))
        candidato.votos += 1
        if(!candidato.hasErrors()){
            candidato.save(flush: true)
        }else{
            return "Erro ao votar!"
        }
        return "Voto computado com sucesso!"
    }

    def cadastrar(String nome, String numero, String tipo){
        try {
            def candidato = new Candidato()
            candidato.nome = nome
            candidato.numero = Integer.parseInt(numero)
            candidato.tipo = tipo
            candidato.votos = 0
            if (!candidato.hasErrors()) {
                candidato.save(flush: true, failOnError: true)
                return "Candidato cadastrado com sucesso"
            } else {
                return "Erro ao cadastrar"
            }
        }catch(exception){
            return "Erro ao cadastrar! Verifique se os dados já existem."
        }
    }

    def deletar(String id){
        try{
            def candidato = Candidato.findById(Integer.parseInt(id))
            candidato.delete(flush: true)
            return "Deletado com sucesso!"
        }catch(exception){
            return "Erro ao deletar!"
        }
    }

    def editar(String id, String nome, String numero, String tipo){
        try{
            def candidato = Candidato.findById(Integer.parseInt(id))
            candidato.nome = nome
            candidato.numero = Integer.parseInt(numero)
            candidato.tipo = tipo
            if(!candidato.hasErrors()) {
                candidato.save(flush: true)
                return "Editado com sucesso!"
            }else{
                return "Erro ao editar!"
            }
        }catch(exception){
            return "Erro ao editar!"
        }
    }

    def procurar(String numero){
        try{
            def candidato = Candidato.findByNumero(Integer.parseInt(numero))
            return candidato
        }catch(exception){
            return "Candidato não encontrado!"
        }
    }

}