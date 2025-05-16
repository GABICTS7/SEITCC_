# Simulação de Geração de Grade de Horários
# Projeto de Gestão Escolar - IA Horários

import random
import json

# Simulando os dados básicos
dias_da_semana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
turnos = ["Manhã", "Tarde"]
horarios_aula = ["07:00-08:00", "08:00-09:00", "09:00-10:00", "10:20-11:20", "11:20-12:20"]
disciplinas = ["Matemática", "Português", "História", "Geografia", "Ciências", "Inglês", "Artes", "Educação Física"]

# Supondo IDs fictícios de professores e turmas para simulação
professores = [1, 2, 3, 4, 5, 6, 7, 8]
turmas = [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Função para gerar a grade de forma aleatória
def gerar_grade():
    grade = []

    for turno in turnos:
        for dia in dias_da_semana:
            for horario in horarios_aula:
                turma_id = random.choice(turmas)
                disciplina = random.choice(disciplinas)
                professor_id = random.choice(professores)

                entrada = {
                    "turno": turno,
                    "dia_semana": dia,
                    "horario_aula": horario,
                    "professor_id": professor_id,
                    "sala_id": None,  # opcional para expansão futura
                    "disciplina": disciplina,
                    "turma_id": turma_id
                }
                grade.append(entrada)

    return grade

# Se quiser gerar e visualizar o resultado rodando o script diretamente:
if __name__ == "__main__":
    grade_gerada = gerar_grade()

    # Salvar em um arquivo JSON
    with open('grade_gerada.json', 'w', encoding='utf-8') as f:
        json.dump(grade_gerada, f, ensure_ascii=False, indent=4)

    print("Grade de horários gerada e salva como 'grade_gerada.json'.")
