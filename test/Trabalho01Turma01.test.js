const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('Testes de Gerenciador de Tarefas', () => {    
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas('Google', 1);       
    });

    test('Deve adicionar uma tarefa com descrição válida.', () => {
        const tarefa = { descricao: 'teste teste', id: 10 };
        expect(() => gerenciador.adicionarTarefa(tarefa)).not.toThrow();        
    });

    test('Tem que dar erro pois o tamanho da descrição é muito curta.', () => {
        const tarefa = { descricao: 'abc', id: 11 };
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');        
    });

    test('Tem que remover a tarefa', () => {
        const tarefa = { descricao: 'tarefa1', id: 1 };
        gerenciador.adicionarTarefa(tarefa);
        const asd = gerenciador.removerTarefa(1);
        expect(() => asd).toBeDefined();
    });

    test('Buscar tarefa por ID.', () => {
        const tarefa = { descricao: 'tarefa2', id: 2 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.listarTarefas();
        expect(() => gerenciador.buscarTarefaPorId(3)).toBeTruthy();
    });

    test('Atualizar tarefa.', () => {
        const tarefa = { descricao: 'tarefa3', id: 3 };
        const novaTarefa = { descricao: 'tarefaNova', id:8 }
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.listarTarefas();
        const asd = gerenciador.atualizarTarefa(3, novaTarefa)
        expect(() => asd).toBeDefined();
    });

    test('Deve mostrar a lista de Tarefas existentes.', () => {        
        const tarefa = { descricao: 'tarefa4', id: 4 };    
        gerenciador.adicionarTarefa(tarefa);    
        const tarefas = gerenciador.listarTarefas();    
        expect(tarefas).toEqual([{ descricao: 'tarefa4', id: 4 }]);
    });

    test('Deve contar quantas tarefas existem.', () => {        
        const tarefa = { descricao: 'tarefa5', id: 5 };    
        gerenciador.adicionarTarefa(tarefa);    
        const tarefas = gerenciador.contarTarefas(); 
        expect(tarefas).toStrictEqual(1);
    });

    test('Deve atualizar uma tarefa para concluído.', () => {        
        const tarefa = { descricao: 'tarefa6', id: 6, concluida: false};    
        gerenciador.adicionarTarefa(tarefa);    
        gerenciador.marcarTarefaComoConcluida(tarefa.id); 
        expect(gerenciador.listarTarefas()).toEqual([{"concluida": true, "descricao": "tarefa6", "id": 6}]);
    });

    test('Deve atualizar tarefa de false para true.', () => {        
        const tarefa = { descricao: 'tarefa7', id: 7, concluida: false};    
        gerenciador.adicionarTarefa(tarefa);    
        gerenciador.marcarTarefaComoConcluida(tarefa.id); 
        expect(gerenciador.listarTarefasConcluidas()).toEqual([{"concluida": true, "descricao": "tarefa7", "id": 7}]);
    });

    test('Deve listar as tarefas pendentes.', () => {        
        const tarefa = { descricao: 'tarefa8', id: 8, concluida: false};    
        gerenciador.adicionarTarefa(tarefa);            
        expect(gerenciador.listarTarefasPendentes()).toEqual([{"concluida": false, "descricao": "tarefa8", "id": 8}]);
    });

    test('Deve remover as tarefas concluidas.', () => {        
        const tarefa = { descricao: 'tarefa9', id: 9, concluida: false};    
        gerenciador.adicionarTarefa(tarefa);            
        expect(gerenciador.removerTarefasConcluidas()).not.toBeDefined();
    });

    test('Deve buscar tarefas por descricao.', () => {        
        const tarefa = { descricao: 'tarefa10', id: 10, concluida: false};    
        gerenciador.adicionarTarefa(tarefa);            
        expect(gerenciador.buscarTarefaPorDescricao(tarefa.descricao)).toEqual([ { descricao: 'tarefa10', id: 10, concluida: false } ])
    });

    test('Deve adicionar tag a tarefa.', () => {        
        const tarefa = { descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        expect(() => gerenciador.adicionarTagATarefa(tarefa.id, tarefa.tag)).toBeTruthy();                
    });

    test('Deve remover tag da tarefa.', () => {        
        const tarefa = { descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        expect(() => gerenciador.removerTagDaTarefa(tarefa.id, tarefa.tag)).toBeTruthy();                
    });

    test('Deve listar tarefas por tag.', () => {        
        const tarefa = { descricao: 'tarefa13', id: 13, concluida: false, tags: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        const bebebe = gerenciador.listarTarefasPorTag(tarefa.tags);                
        expect(() => bebebe.toEqual());
    });

    test('Deve buscar tarefa por data.', () => {        
        const tarefa = { data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        const bebebe = gerenciador.buscarTarefasPorData(tarefa.data);                
        expect(() => bebebe.toEqual([{ data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'}]));
    });

    test('Deve atualizar prioridade.', () => {        
        const tarefa = { prioridade: 2, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        const bebebe = gerenciador.atualizarPrioridade(tarefa.id, 4);                
        expect(() => bebebe.toEqual([{ prioridade: 2, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'}]));
    });

    test('Deve listar tarefas filtrando por prioridade.', () => {        
        const tarefa = { prioridade: 3, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        const bebebe = gerenciador.listarTarefasPorPrioridade(tarefa.prioridade);                
        expect(() => bebebe.toEqual([{ prioridade: 3, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'}]));
    });

    test('Deve contar quantas tarefas existem filtrando por prioridade.', () => {        
        const tarefa = { prioridade: 3, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);            
        const bebebe = gerenciador.contarTarefasPorPrioridade(3);                
        expect(() => bebebe.toBe(1));
    });

    test('Deve marcar todas as tarefas como concluidas.', () => {        
        const tarefa = { prioridade: 3, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'};    
        const tarefa2 = { prioridade: 2, data: '2024-01-01', descricao: 'tarefa12', id: 12, concluida: false, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);       
        gerenciador.adicionarTarefa(tarefa2);            
        gerenciador.marcarTodasComoConcluidas();                
        expect(() => gerenciador.listarTarefasConcluidas().toBeDefined());
    });

    test('Deve reabrir uma tarefa fechada.', () => {   
        const tarefa = { prioridade: 3, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: true, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);                  
        gerenciador.reabrirTarefa(tarefa.id);       
        const baba = gerenciador.listarTarefas();         
        expect(() => baba.toEqual([{prioridade: 3, data: '2024-01-01', descricao: 'tarefa11', id: 11, concluida: false, tag: 'Jogos'}]));
    });

    test('Deve ordenar as tarefas por data.', () => {   
        const tarefa = { prioridade: 3, data: '2024-01-03', descricao: 'tarefa11', id: 11, concluida: true, tag: 'Jogos'};    
        const tarefa2 = { prioridade: 3, data: '2024-01-02', descricao: 'tarefa12', id: 12, concluida: true, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);                  
        gerenciador.adicionarTarefa(tarefa2); 
        gerenciador.ordenarTarefasPorData();       
        const baba = gerenciador.listarTarefas();         
        expect(() => baba.toEqual([
            {
              prioridade: 3,
              data: '2024-01-02',
              descricao: 'tarefa12',
              id: 12,
              concluida: true,
              tag: 'Jogos'
            },
            {
              prioridade: 3,
              data: '2024-01-03',
              descricao: 'tarefa11',
              id: 11,
              concluida: true,
              tag: 'Jogos'
            }
          ]));
    });

    test('Deve ordenar as tarefas por prioridade.', () => {   
        const tarefa = { prioridade: 3, data: '2024-01-01', descricao: 'tarefa16', id: 16, concluida: true, tag: 'Jogos'};    
        const tarefa2 = { prioridade: 2, data: '2024-01-01', descricao: 'tarefa17', id: 17, concluida: true, tag: 'Jogos'};    
        gerenciador.adicionarTarefa(tarefa);    
        gerenciador.adicionarTarefa(tarefa2);                  
        gerenciador.reabrirTarefa(tarefa.id);       
        const baba = gerenciador.ordenarTarefasPorPrioridade();         
        expect(() => baba.toEqual([
            {
              prioridade: 2,
              data: '2024-01-01',
              descricao: 'tarefa17',
              id: 17,
              concluida: true,
              tag: 'Jogos'
            },
            {
              prioridade: 3,
              data: '2024-01-01',
              descricao: 'tarefa16',
              id: 16,
              concluida: false,
              tag: 'Jogos'
            }
          ]));
    });
});