package t2

class Candidato {
    String nome
    int numero
    int votos
    String tipo

    static constraints = {
        nome blank: false, nullable: false, unique: true
        numero blank: false, nullable: false, unique: true
        votos blank: false, nullable: false
        tipo blank: false, nullable: false
    }
}
