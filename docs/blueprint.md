# Pauta Creator
## Blueprint do painel de campanhas, conteúdo e recebimentos

**Versão 0.1 • Pesquisa documental em 20 de novembro de 2026 • Produto em definição**

Ao abrir o painel pelo celular antes de gravar, a equipe deve conseguir responder em poucos segundos: qual vídeo vem primeiro, em que conta ele entra, qual briefing vale e de quem depende o próximo passo? No fechamento do mês, a mesma campanha deve explicar cada real recebido e cada parcela em aberto.

**Repositório sugerido** `pauta-creator`  
**Descrição para o GitHub** Painel de creators e UGC para gerenciar contas, campanhas, entregas, direitos de uso e recebimentos em Instagram, TikTok e YouTube.  
**Licença proposta** GNU Affero General Public License v3.0 only, SPDX `AGPL-3.0-only`. Nome de trabalho, pendente de pesquisa de marca e domínio antes da oferta pública.

### Guia de leitura

1. Pesquisa de mercado e relatos de uso
2. Escopo e jornadas de referência
3. Telas, navegação e desenho do painel
4. Regras de negócio e dados
5. APIs e indicadores
6. Arquitetura, privacidade e operação
7. Plano, backlog e critérios de lançamento
8. Validação comercial e referências

## 1. Mercado e evidências

Pesquisa de mesa com documentação de produtos, páginas de desenvolvedores, repositórios públicos e conversas abertas de creators. “Funciona” aqui significa que um fluxo está documentado ou que alguém relatou benefício. Retenção, lucratividade e satisfação média dos concorrentes não foram verificadas. A amostra de opiniões é pequena, sobretudo em inglês, e algumas respostas promovem produtos próprios.

| Referência | Como resolveram | O que aproveitar | Onde investigar oportunidade |
|---|---|---|---|
| Squid/Wake [1–3] | A pessoa se candidata, acompanha a seleção e entrega conteúdos para análise. Existem cachê, seeding e incentivos por performance. O contrato define condições de pagamento. | Guardar link da oportunidade, estado informado pela plataforma, contrato e condição que inicia a contagem do pagamento. | Ao alternar Squid e trabalhos diretos, os creators precisam ver as pendências de ambos no mesmo dia. O painel pode começar com atualização manual. |
| UGC Planner [4] | CRM especializado com marcas, propostas, entregas, direitos, envio de produtos, calendário, despesas, faturas e links de entrega. Oferece quadro e tabela. | A campanha reúne materiais e dinheiro. A existência de um concorrente tão próximo torna calendário e CRM requisitos básicos. | Testar se operar várias contas, registrar condições brasileiras e cruzar recebíveis com entregas por plataforma justificam a troca. Recursos ausentes na página continuam indeterminados. |
| Passionfroot [5] | Calendário admite reservas externas. Produtos representam espaços comerciais de um canal. Um pacote pode repartir valor entre inserções. | Calendário único e pacote comercial com várias peças. | Para UGC entregue em arquivo, a data relevante pode ser o aceite da marca. Testar fluxo sem reserva de espaço no perfil do creator. |
| Trello, Drive, e-mail e planilha [6–7] | Pessoas relatam usar quadro para acompanhar jobs, Drive para brutos e editados, etiquetas de e-mail para negociação e planilha para pagamentos. Há relatos positivos sobre a facilidade de começar e sobre lembretes em ferramentas especializadas. | Preservar links e organização de pastas existentes. Permitir criar oportunidade com título, origem e próximo passo em uma tela. | A informação se fragmenta quando uma revisão muda o prazo ou um post ganha mídia paga. Testar se centralizar essa decisão economiza tempo suficiente. |
| Cobrança depois da entrega [8] | Em relato de campanha mensal no Instagram, havia contrato e cobrança enviada. Uma resposta apontou que duas semanas poderiam ainda estar dentro do prazo contratual. | Separar emissão, vencimento e contato de cobrança. Abrir o contrato direto da parcela. | “Esperando pagamento” exige valor, evento inicial e data confirmada. A falta de data merece uma pendência própria. |

**Leitura comercial.** O UGC Planner anuncia os dois primeiros deals gratuitos e planos de US$ 7,99 e US$ 11,99 por mês na página consultada [4]. É uma referência internacional de posicionamento. Para estimar preço no Brasil, será preciso observar substituição de planilha, retorno semanal e adesão paga em reais.

### Código aberto para estudar

| Projeto | Observar no código | Decisão de implementação |
|---|---|---|
| Postiz, AGPL-3.0 [9] | Organização dos provedores sociais, fronteira entre autenticação e operação de cada rede, implantação self-hosted. | Estudar interfaces e falhas que o conector precisa expor. Começar com leitura e associação de publicações. Um fork traria grande parte de um agendador para o escopo do MVP. |
| Kanboard, MIT [10] | Quadro com tarefas, mudanças de coluna e configuração de fluxo. | Usar como referência para movimentação acessível e histórico. Uma mudança de coluna comercial nunca deve liquidar uma parcela. |

Antes de adotar código, registrar arquivo, versão/commit, licença e avisos da dependência no PR. A evidência pública consultada descreve produtos e repositórios. A escolha de módulos reutilizáveis exige revisão de código no início da integração.

## 2. O produto e as jornadas

**Público inicial.** Creator que vende exposição nos próprios perfis, produz material UGC para terceiros ou combina os dois. O piloto começa com um espaço de trabalho compartilhado. Perfil de creator, pessoa com acesso ao sistema e conta social são cadastros distintos. Isso permite ajudar na operação sem compartilhar senha da rede.

| Entra na versão pessoal | Depois de observar uso | Fora do investimento inicial |
|---|---|---|
| Instagram, TikTok e YouTube cadastrados manualmente. Plataformas, marcas e contatos. Campanhas, inscrições por conta, produções e datas. | Sincronização de métricas com consentimento, sugestões de vínculo e relatório de campanha. | Marketplace próprio de oportunidades, coleta por scraping, compra de mídia e publicação automática. |
| Briefing, ideias, contrato privado, versões por link, notas, direitos, código e validade. Lista diária, agenda, pagamentos parciais e exportação. | Biblioteca de formatos recorrentes, importação CSV com prévia e deduplicação, convites, lembretes externos e painel de renovação. | Custódia de pagamentos de marcas, emissão fiscal integrada, assinatura eletrônica própria, hospedagem e transcodificação de brutos. |
| Conteúdo orgânico sem campanha e UGC sem post público. | Links privados de revisão para marcas, métricas manuais com evidência, comparativos por formato. | Ranking de creators e atribuição automática de vendas a visualizações. |

**Jornada A · Influenciadora.** Salvar oportunidade da Squid → escolher a conta candidata → registrar aprovação → desdobrar briefing em quatro entregas → mandar versão para análise → responder a ajustes → marcar quais foram aprovadas para publicação → informar URL de cada post → registrar aceite e acompanhar parcelas. Datas e cachês só entram quando conhecidos.

**Jornada B · UGC para marca.** Registrar negociação direta → criar entrega “arquivo para a marca” → guardar versão e direitos pactuados → registrar envio privado e comprovante de aceite → concluir obrigação → receber. Se a marca informar o post posteriormente, anexar URL externa. A conclusão funciona mesmo sem perfil público ou acesso aos insights da marca.

**Jornada C · Conteúdo próprio.** Anotar ideia → planejar gravação → publicar no perfil → registrar link → associar a uma parceria posteriormente, caso haja autorização de mídia ou contratação. Manter data do post e data de início dos direitos.

**Jornada D · Uma oportunidade, dois perfis.** Inscrever dois perfis em uma ação quando permitido. Acompanhar um aprovado e outro em avaliação, filtrar os dois separadamente e criar entregas apenas para a participação contratada. Um cachê de pacote é lançado uma única vez.

## 3. Telas e navegação

**Formato proposto.** Aplicação web responsiva em português brasileiro. No desktop, menu lateral e espaço para tabela e detalhe lado a lado. No celular, abas Hoje, Campanhas, Agenda e Mais, além de “Adicionar” para captura rápida. O cadastro inicial pede nome do espaço e a primeira conta ou plataforma. UGC direto pode começar apenas com a marca.

### Tela inicial exemplificada

Cenário ilustrativo em 20/11, sem dados pessoais ou valores de uma campanha real. O primeiro bloco é a fila de trabalho. Cada linha contém informação suficiente para decidir se vale abrir a campanha.

| Hoje · Todos os perfis | Origem / conta | Quando | Ação na linha |
|---|---|---|---|
| Enviar versão 2 do vídeo 2 de 4 | Squid · TikTok @exemplo | Hoje, 16h | Abrir feedback e registrar envio |
| Publicar Reel aprovado | Direto · Instagram @exemplo | Hoje, 19h | Abrir legenda e colar link publicado |
| Confirmar vencimento da parcela final | Direto · UGC para a marca | Após aceite, data a confirmar | Abrir contrato e definir vencimento |

Abaixo da fila aparecem **Aguardando terceiros** (item, de quem depende, desde quando, data de retorno), **Próximos 7 dias** (agenda compacta) e **Financeiro** (recebido no mês, saldo em aberto e parte vencida). Cada número abre a lista que o compõe. À direita no desktop, ou abaixo no celular, aparecem direitos próximos do fim. O filtro de perfil, origem e período permanece visível. “Sem prazo” tem contagem própria para trabalhos que desapareceriam do calendário.

| Tela e fase | Conteúdo e organização | Ação principal e comportamento |
|---|---|---|
| Hoje · MVP | Fila por atraso, hoje e próximos dias. Em espera e financeiro em blocos próprios. Separar tarefa minha da resposta da marca. | Concluir, adiar com nova data ou abrir contexto. Dia sem pendências mostra o próximo compromisso. |
| Contas e creators · MVP | Dono do perfil, rede, @, URL, tipo de conta, observações, campanhas e entregas. Mostrar contas arquivadas por filtro. | Cadastrar e editar sem OAuth. Mudança de @ preserva a identidade e os vínculos. |
| Plataformas e marcas · MVP | Diretório com tipo, URL do painel, perfil inscrito, situação do cadastro, contato, tags, notas e último acesso informado. Marca contratante, agência, pagador e plataforma podem diferir. | Abrir painel externo e ver inscrições, tarefas e saldo ligados à origem. Negociação direta dispensa plataforma intermediária. |
| Campanhas · MVP | Tabela inicial com marca, origem, contas, seleção, entregas concluídas/total, próximo passo, responsável e saldo. Filtros combináveis. Quadro opcional agrupa por etapa comercial. | Criar rapidamente, duplicar estrutura, filtrar “pendente de publicar” ou “esperando pagamento”. Duplicação exclui contratos, códigos e pagamentos anteriores. |
| Ficha da campanha · MVP | Cabeçalho com marca, etapa, origem e próximo prazo. Abas Resumo, Entregas, Materiais, Direitos e Financeiro. Resumo reúne participantes, contato e histórico. | Adicionar entrega, registrar feedback, abrir versão aprovada, confirmar aceite e lançar recebimento. Atalhos externos rotulados por destino. |
| Conteúdos e ideias · MVP | Lista com miniatura opcional, roteiro, gancho, formato, CTA, versão, destino, direitos e posts associados. Ideias próprias ou da campanha. | Converter ideia em entrega preservando texto. Reusar um vídeo em dois posts com URLs diferentes. Filtrar arquivos entregues à marca. |
| Agenda e tarefas · MVP | Agenda semanal/lista móvel. Alternar gravação, revisão, postagem, follow-up, vencimento e fim de direitos. Exibir horário local e responsável. | Reagendar com motivo. Alterar prazo de postagem mantém visível o prazo de aprovação. Listar compromissos em conflito sem bloqueio automático. |
| Financeiro · MVP | Abas A receber, Recebidos e Permutas. Parcelas, pagador, valor contratado, taxas, comprovante, vencimento, data de baixa e campanha. | Registrar parcial, quitar, corrigir por estorno, cobrar manualmente e exportar extrato filtrado. |
| Configurações · MVP | Fuso, moeda, perfis, exportação, backup e acesso. | Baixar dados e visualizar quando ocorreu a última cópia restaurável. |
| Conexões e desempenho · pós-MVP | Contas elegíveis, escopos, última coleta, falhas e período coberto. Relatório por publicação ou conta, sempre com fonte. | Autorizar, reconectar, desligar, confirmar vínculo, ver dado indisponível e baixar relatório permitido. |
| Gestão da assinatura · comercial | Plano, membros, consumo, cobrança da hospedagem, exportação e encerramento do espaço. | Convidar por função, trocar plano, cancelar e obter dados conforme política informada. |

**Interação.** No celular, trocar arrastar por seletor de etapa com confirmação visual. Usar texto e ícone junto da cor. Guardar rascunho ao anexar arquivo. Distinguir “sem campanhas”, “nenhuma com este filtro” e “falha ao carregar”. Erro de gravação preserva os campos. Navegação por teclado e foco devem funcionar na tabela, abas e diálogos. Testar a largura de 360 px e formulários com teclado virtual aberto.

## 4. Regras e modelo de dados

### Quem pode mudar de estado

| Objeto | Estados e regra |
|---|---|
| Participação / candidatura | Salva → enviada → em avaliação → aprovada, recusada ou retirada. Permitir cadastro direto já aprovado. Guardar estado original da plataforma e data da última conferência. |
| Campanha | Prospecção → negociação → ativa → concluída. Pausada e cancelada exigem anotação. Marcar conclusão operacional quando todas as obrigações forem aceitas ou dispensadas, com justificativa. Permitir reabertura registrada. |
| Entrega | Planejada → em produção → em revisão → ajustes solicitados → reenviada → aprovada. Para arquivo: enviada à marca → aceita. Para publicação: pronta para publicar → publicada → aceite/comprovação, conforme briefing. Datas de envio e aceite são eventos distintos. |
| Parcela | A confirmar, a vencer, parcial, paga ou cancelada. Vencida é condição calculada para saldo positivo após vencimento, inclusive quando parcial. O filtro financeiro atravessa campanhas concluídas. |
| Direito e autorização técnica | Direito guarda uso orgânico/pago, território, canais, exclusividade, período e possibilidade de portfólio. Autorização técnica guarda plataforma, código, post, validade e revogação. Mostrar divergências entre as datas dos dois. |

**Regras financeiras.** Valores em unidades mínimas e moeda explícita. Contratado soma parcelas de cachê confirmadas. Previsto por performance fica separado até a confirmação. Recebido no mês segue a data efetiva de cada baixa. Saldo da parcela = valor confirmado menos baixas brutas válidas, ajustadas por estornos. Líquido recebido = baixa bruta menos taxas/descontos registrados. Reembolso e permuta têm categorias próprias. Mostrar totais por moeda. Ao filtrar por conta, indicar “pacote compartilhado” ou usar rateio explícito que some 100%. Filtrar nunca multiplica a receita pela quantidade de posts.

**Exemplo de aceite financeiro.** Contrato fictício de R$ 800, com duas parcelas de R$ 400. Uma baixa bruta de R$ 250 com taxa de R$ 10 resulta em R$ 240 líquidos recebidos e R$ 550 em aberto. Se apenas a primeira parcela venceu, R$ 150 aparecem como vencidos. Entregar os quatro vídeos mantém esses valores. Se o prazo depende do aceite e ele ainda não chegou, mostrar “aguarda aceite” com tarefa de acompanhamento.

### Entidades e relações que orientam as migrações

| Grupo | Entidades e campos essenciais | Integridade |
|---|---|---|
| Identidade | Workspace, usuário, membro/função, perfil de creator, conta social com rede e ID local estável | Toda entidade privada pertence a um espaço. Perfil pode operar várias contas. Identificador remoto opcional no cadastro manual. |
| Origem | Organização (marca/agência/plataforma/pagador), contato, inscrição em plataforma (perfil e contas vinculadas, situação, URL do cadastro) | Uma organização pode acumular papéis. Uma inscrição permanece mesmo sem campanha. |
| Trabalho | Campanha, participação (perfil/conta, estado, link externo), entrega (destino, prazo, responsável, aceite), tarefa (dependência, vencimento, concluída em) | Campanha admite várias participações e entregas. Trabalho direto permite origem direta. UGC pode não ter conta de publicação. |
| Criação | Ideia, peça criativa, versão (URL privada ou arquivo, autor, data), publicação (rede, ID/URL, conta própria ou externa), vínculos entre entrega, peça e publicação | Uma peça tem várias versões e publicações. Uma entrega aponta à versão aprovada. Associação com campanha registra a finalidade e impede contagem duplicada do mesmo post no relatório. |
| Documentos | Nota, briefing versionado, contrato, anexo, evento (quem, quando, ação, referência), direito de uso, autorização técnica | Contrato alterado cria versão. Direito pode abranger várias peças. Revelar/copiar código depende de permissão e gera evento sem o valor. |
| Dinheiro | Acordo, parcela, baixa, estorno, despesa, permuta e comprovante | Parcela aceita várias baixas. Operações financeiras em transação com chave de idempotência. Correção preserva histórico. |
| Integrações | Conexão OAuth, credencial cifrada, cursor de sincronização, métrica e observação por período | Chave única por provedor, objeto, métrica, período, granularidade e origem. Repetir coleta atualiza a observação pertinente. |

**Filtros que viram consultas de aceite.** “Em aprovação” oferece candidaturas ou entregas para revisão. “Ativas” usa o estado comercial. “Pendentes de publicar” procura obrigações aprovadas de postagem que ainda não têm publicação confirmada. “Esperando pagamento” lista saldos confirmados em aberto, inclusive sem vencimento. “O que fazer na Squid pelo @perfil” cruza origem, participação/entrega, responsável e tarefa aberta. A listagem deve identificar a obrigação exata que originou o resultado.

## 5. Integrações e indicadores

| Rede | Escopo inicial de leitura | Pré-condições e prova técnica |
|---|---|---|
| Instagram [11–12] | Conta profissional própria, catálogo de mídias e insights disponíveis para conta ou mídia. Registrar alcance e interações quando o formato admitir. | Escolher uma única modalidade de login. Verificar permissões de insight dessa modalidade, nível de acesso, revisão e elegibilidade do formato. Testar com perfil do app e depois com uma conta externa autorizada. Conta pessoal continua com registro manual. |
| TikTok [13–15] | Login Kit e Display API para identidade e vídeos públicos autorizados. Selecionar campos de visualizações, curtidas, comentários e compartilhamentos quando retornados. | Aprovação dos produtos e escopos de perfil/vídeo. Testar listagem paginada e correspondência do ID ao vídeo cadastrado. Avaliar estatísticas de perfil com escopo próprio, quando aprovado. O código Spark Ads é cadastrado com validade em fluxo separado. |
| YouTube [16–17] | Data API para identidade e catálogo do canal, Analytics API para relatório por canal, vídeo e período. Começar com visualizações e tempo assistido quando disponíveis. | OAuth do titular. reports.query documenta youtube.readonly e yt-analytics.readonly para relatórios de atividade. Testar channel==MINE, janela de datas e filtro de vídeo. Revisar quota, verificação OAuth, retenção e política de métricas derivadas antes de abrir ao público. |

**Ordem proposta.** Iniciar o primeiro piloto com a rede que tiver mais posts próprios vinculados a campanhas reais. Em empate, começar por YouTube, cujo relatório por vídeo permite verificar o vínculo ponta a ponta. Para uma carteira predominantemente UGC privada, priorizar aceite e renovação de direitos mesmo que isso adie conectores. Cada rede tem um marco de aprovação próprio.

**Ciclo da conexão.** Usuário escolhe conta → servidor inicia OAuth com proteção de estado → mostra perfil remoto para confirmação → sincroniza em segundo plano → sugere vínculos por ID ou URL canônica → usuário confirma ambiguidade. Se a permissão expirar, mostrar último sucesso e ação de reconexão. Aplicar espera progressiva em falhas transitórias e limites, registrar cursor por conta e permitir sincronização manual com limite. A desconexão interrompe tarefas e dispara a política de revogação/remoção de dados aplicável ao provedor.

**Semântica de analytics.** Guardar nome nativo, unidade, período, fuso, fonte, momento da consulta e se o valor é acumulado ou do intervalo. Métrica cumulativa não se soma entre coletas. Indisponível aparece como traço com motivo; zero significa resposta numérica zero. Para posts da marca ou stories expirados, aceitar evidência manual com data. Relatório lista resultados de cada publicação com a definição da rede. Evitar total de alcance entre redes, pois a mesma pessoa pode aparecer várias vezes. Receita contratual vem do financeiro. Atribuição de vendas requer fonte de conversão e regra própria.

**Prova mínima por conector.** Verificar conta correta, um post existente, URL duplicada, vídeo privado/removido, permissão revogada, resultado parcial, repetição da mesma coleta e exclusão solicitada. Definir por escrito campos, frequência, retenção permitida e custo por conta antes de ativar coleta periódica. APIs e permissões foram pesquisadas em documentação. A aprovação e o comportamento nas contas do piloto dependem de um app registrado e de testes reais.

## 6. Arquitetura, privacidade e operação

**Decisão técnica proposta.** Monólito modular em Django, PostgreSQL, templates responsivos e interações incrementais com HTMX. A equipe inicial é pequena, o núcleo é relacional e as operações principais são formulários, filtros e histórico. Essa escolha permite entregar a primeira versão com um único serviço web e uma base. Usar armazenamento privado compatível com S3 para contratos e comprovantes. Vídeos pesados começam por links do Drive ou equivalente, com aviso de que a permissão do link é gerida na origem. Adicionar processo de tarefas e agendador na etapa de sincronização. PostgreSQL permanece a fonte dos dados operacionais.

**Módulos sugeridos.** Identidade e acesso, diretório, campanhas e produção, financeiro, documentos e direitos, integrações e relatórios. A página Hoje consulta esses módulos. Uma alteração de estado deve gravar mudança e evento histórico na mesma transação. Usar versão do registro em edições concorrentes para avisar que outra pessoa já alterou o briefing. Guardar datas de vencimento civil como data e compromissos com hora como instante com fuso. Exibir America/Sao_Paulo inicialmente.

**Operações de referência para implementação.** Criar campanha com participantes e origem em transação. Acrescentar entrega com tipo de destino. Enviar versão para análise, receber feedback e aprovar um ID de versão explícito. Registrar post deduplicando ID externo ou URL normalizada dentro da rede. Lançar baixa e atualizar saldo atomicamente. Registrar direito e código com permissão separada. As rotas recebem o espaço autenticado pelo servidor e verificam pertença de toda referência relacionada, inclusive em downloads e buscas.

**Acesso inicial.** Instância privada, login individual para cada pessoa que operar o painel. Função de proprietário administra o espaço e configura acesso. Operador trabalha nas campanhas. No beta, separar acesso financeiro e permissão para ver contratos ou códigos. Compartilhamento com marca, se validado, usa link limitado a uma entrega, com expiração e revogação. Revisar permissões também em cache, exportações e tarefas assíncronas.

**Arquivos e segredos.** Contratos e comprovantes ficam fora de repositórios e de URLs públicas permanentes. Servir por autorização e URL temporária. Validar tamanho, tipo permitido e nome do upload. No lançamento público, limitar volume e inspecionar anexos. Cifrar tokens e códigos com chave fora do banco, mascarar na tela e excluir de logs, telemetria e CSV padrão. Relatórios exportados devem evitar fórmulas executáveis vindas de textos de terceiros. Revogar autorização no painel registra o evento; se a revogação precisar ser feita na rede, mostrar essa pendência até a confirmação.

**Recuperação e portabilidade.** CSVs por entidade com IDs estáveis para abrir em planilha. Exportação completa privada com manifesto, relações, documentos e instruções de restauração, com tratamento separado de segredos. Cópia automática de banco e anexos, criptografada e fora do host. Para o MVP, alvo inicial de perda máxima de 24 horas. Antes de usar contratos reais e antes de migrações importantes, restaurar em ambiente vazio e conferir saldos, versões aprovadas e anexos. Definir retenção e expiração das cópias ao abrir o beta.

**Preparação brasileira.** Antes de captar clientes, inventariar dados pessoais de usuários e contatos de marcas, finalidades, bases aplicáveis, fornecedores, retenção e fluxo de atendimento a titulares. Publicar aviso de privacidade e canal de suporte, testar exportação e exclusão e documentar resposta a incidentes. O guia da ANPD oferece referência para pequenos agentes [18]. No checklist de publicação, incluir campo para registrar a identificação da parceria e conferir as orientações da marca e do CONAR [19]. Controlar quem pode usar a imagem, durante quanto tempo e em quais canais segue o contrato de cada job.

**Distribuição.** Adotar o texto integral da AGPL v3 no arquivo LICENSE da raiz ao criar o repositório. Serviços de hospedagem, suporte e manutenção podem compor a oferta paga. Para uma versão modificada oferecida pela rede, a seção 13 exige oferecer o código-fonte correspondente aos usuários que interagem remotamente com ela [20]. Planejar link “Código desta versão” apontando ao código correspondente ao release em execução, com instruções de build e dependências. Manter credenciais e dados de clientes fora da distribuição. Eventual licenciamento alternativo exige avaliar autoria e contribuições.

## 7. Execução do MVP à comercialização

Estimativas de esforço para **uma pessoa desenvolvendo**, com interface web responsiva e vídeos por link. São faixas de planejamento em dias úteis de dedicação efetiva. Pesquisa com usuários e espera por aprovação externa têm duração própria. Cada etapa entrega um fluxo utilizável.

| Marco | Entrega e dependências | Esforço inicial | Critério de saída |
|---|---|---|---|
| M0 · Fundação | Criar repo, aplicar licença, configurar ambiente reproduzível, migração, login, isolamento do espaço e backup. Escolher exemplos anonimizados. | 2–4 dias | Instalar em ambiente limpo. Dois usuários permitidos acessam o mesmo espaço. Conta externa não acessa seus dados. |
| M1 · Cadastro até seleção | Contas, inscrições, marcas, campanha, participantes, estados e captura rápida. Depende de M0. | 4–6 dias | Ver em qual plataforma cada perfil está inscrito e obter a lista de candidaturas pendentes por conta. |
| M2 · Produção até aceite | Entregas, tarefas, materiais privados, ideias, revisão, links, direitos e códigos. Hoje e agenda consultam as mesmas datas. Depende de M1. | 7–10 dias | Simular quatro vídeos, uma revisão, uma entrega privada e duas publicações a partir da mesma peça. Proteger contrato e código. |
| M3 · Valor até recebimento | Parcelas, estornos, taxas, vencimentos, permuta, filtros e exportações. Integrar o saldo ao dashboard. | 4–7 dias | Reproduzir o exemplo de R$ 800, fazer a restauração e conferir cada total na lista de origem. **MVP pessoal utilizável.** |
| M4 · Uso real e refinamento | Usar em campanhas reais durante 2–4 semanas de calendário. Registrar tarefas demoradas, atalhos usados e campos ignorados. | 3–5 dias de ajustes além da observação | Completar uma entrega privada e uma publicação. Acompanhar ao menos uma parcela até a baixa real, mesmo se levar mais que o piloto. |
| M5 · Primeira rede | Prova de leitura, OAuth, catálogo, vínculo confirmado, métricas, expiração e remoção. Selecionar a rede por uso. | 5–10 dias para a primeira prova | Uma conta autorizada e uma publicação real conciliadas com a fonte, janela temporal documentada e fallback manual funcional. |
| M6 · Beta fechado | Onboarding sem assistência, isolamento entre clientes, limites de armazenamento, suporte, monitoramento, políticas e restore. Conectores seguintes entram separadamente. | 8–15 dias, mais observação | Cinco creators externos usam dados próprios com consentimento. Testes de isolamento, exclusão e recuperação aprovados antes dos convites. |
| M7 · Serviço comercial | Hospedagem administrada, cobrança da assinatura, cancelamento, limites, custos, termos e fonte do release. | 6–12 dias após o beta | Cobrança e cancelamento testados, margem estimada por cliente, usuários pagantes e processo de suporte definido. |

**Previsão do primeiro corte.** M0–M3 somam 17–27 dias úteis de desenvolvimento. Se o tempo disponível for parcial, ajustar o calendário à capacidade semanal. A primeira publicação privada pode ocorrer no final de M1 com dados fictícios para validar navegação; o uso com documentos reais depende de controle de acesso e restauração verificados.

### Backlog inicial para converter em issues

| Ordem | Issue sugerida | Evidência no PR |
|---|---|---|
| 01 | Iniciar app, licença, CI e configuração de exemplo | Instalação limpa e pipeline executado, sem dados reais no Git. |
| 02 | Implementar login, membros e isolamento do workspace | Segundo workspace falha ao abrir, editar ou baixar recurso alheio por ID. |
| 03 | Cadastrar perfis, contas, plataformas e inscrições | Uma creator com três redes e duas origens consultáveis. |
| 04 | Criar campanha e candidatura por perfil | Estados distintos preservados em uma campanha de duas contas. |
| 05 | Desdobrar briefing em entregas e tarefas | Quatro compromissos com datas e responsáveis próprios aparecem no Hoje. |
| 06 | Versionar briefing, documentos, ideias, feedback e aceite | Abrir o vídeo correto após revisão sem sobrescrever o primeiro envio. |
| 07 | Vincular posts e direitos de uso | Dois posts da mesma peça, autorização com validade divergente sinalizada e caminho UGC privado completo. |
| 08 | Unificar fila, filtros e agenda | Filtro por plataforma mais conta retorna somente ações relacionadas. Adiar altera a data em ambas as telas. |
| 09 | Rastrear parcelas, baixas e estornos | Testes de pagamento parcial, atraso, repetição, concorrência e permuta. |
| 10 | Entregar exportação, backup e deploy privado | Importar restauração em banco vazio, abrir anexo e conferir saldo por campanha. |
| 11 | Medir atrito do piloto e escolher primeiro conector | Diário de uso, amostra de URLs e matriz de métricas permitidas. |
| 12 | Preparar beta e assinatura | Teste de isolamento completo, exclusão, alertas operacionais, cancelamento e fonte do release. |

**Entrega e deploy.** Usar branch curta por issue, PR com migração e cenário de aceite e tag por marco. Desenvolvimento local com Compose. Homologação com dados fictícios e credenciais próprias. Instância pessoal com HTTPS, banco e anexos persistentes, segredos fora da imagem. No beta, separar ambientes, configurar monitoramento de falha de jobs, armazenamento e backups, testar migração numa cópia e prever reversão da versão sem perda de dados. Escolher provedor só quando houver orçamento e volume. Não publicar campanha, contrato ou nome de cliente nos exemplos do GitHub.

### Roteiro de teste manual do primeiro release

1. Criar a conta de TikTok e a inscrição na plataforma Squid. Abrir o diretório e voltar da campanha à página da oportunidade.
2. Registrar uma oportunidade fictícia de quatro vídeos e duas candidaturas. Aprovar apenas uma. Conferir a filtragem por conta.
3. Registrar revisão do vídeo 2 com duas versões. Reabrir no celular e acessar diretamente o feedback da versão correta.
4. Concluir um arquivo UGC por aceite privado. Publicar uma peça própria no Instagram e no YouTube, com um link por rede.
5. Registrar o fim de uso contratual antes da validade técnica do código. Ver alerta, copiar sob autorização e confirmar ausência do código no CSV.
6. Encerrar produção, manter pagamento pendente, registrar duas baixas e estornar uma. Conferir mês de caixa, saldo e parcela vencida.
7. Restaurar o backup em ambiente de teste. Tentar abrir contrato a partir de outro espaço. Verificar que o histórico e a proteção acompanham o arquivo.

## 8. Como decidir se vale comercializar

**Primeiro teste com os creators do piloto.** Durante uma semana, medir quanto tempo leva para localizar a última versão aprovada, listar compromissos dos próximos sete dias e fechar saldo por marca com as ferramentas atuais. Repetir as mesmas tarefas depois do piloto. Anotar toda vez que for preciso sair do painel, o motivo e qual dado estava faltando. Abrir o vídeo no Drive pode ser intencional; procurar em três conversas qual versão vale revela uma falha do produto.

**Beta sugerido.** Recrutar cinco creators brasileiros: dois com foco em UGC privado, dois com posts patrocinados e um perfil híbrido. Em sessão curta, pedir que reconstruam uma campanha recente com dados anonimizados. Observar a primeira tentativa antes de explicar a interface. Perguntar “qual pendência você teria esquecido?”, “o que ainda precisou manter na planilha?” e “por qual parte você pagaria para continuar usando?”. Registrar motivos de abandono e diferenças por volume de jobs.

**Critérios propostos, sujeitos a ajuste.** Pelo menos quatro dos cinco conseguem cadastrar uma campanha e encontrar o próximo prazo sem ajuda. Pelo menos três voltam em três das quatro semanas em que têm trabalho ativo. Pelo menos dois aceitam um piloto pago com preço expresso em reais. Medir também tempo para cadastrar oportunidade, divergências de saldo e suporte por cliente. Amostra pequena orienta o próximo investimento; não estima o tamanho do mercado.

**Oferta a testar.** Self-hosted AGPL para quem administra sua infraestrutura. Hospedagem gerenciada individual com backups, atualizações e suporte. Plano de equipe quando convites, permissões e operação de vários perfis demonstrarem valor. No piloto comparar uma assinatura individual fixa com oferta por espaço compartilhado. Evitar cobrar por campanha antes de verificar se isso desestimula o cadastro que dá utilidade ao painel.

**Economia por cliente.** Orçar banco, armazenamento de documentos, tráfego, jobs de coleta, e-mail, suporte e taxas de cobrança. Estimar custo por espaço ativo e por conta sincronizada. Preço mínimo sustentável depende de custo variável, parcela da infraestrutura e tempo de suporte. Só ampliar integrações ou hospedar vídeos quando existir demanda recorrente e margem para operá-los.

**Decisões abertas e quem as resolve.** O uso no piloto determina a primeira rede e a frequência dos lembretes. O piloto determina se o relatório de marca ou a colaboração em dupla vem primeiro. Disponibilidade de nome, condições dos provedores, revisão jurídica dos termos e preço em reais são marcos anteriores à oferta comercial.

### Fontes consultadas

| ID | Referência e uso |
|---|---|
| 1 | [Squid · funcionamento e modalidades de campanha](https://meajuda.squid.com.br/docs/conheca-a-squid) |
| 2 | [Squid · seleção e status de inscrição](https://meajuda.squid.com.br/docs/como-saber-se-fui-recrutado-para-uma-campanha-serei-contatado) |
| 3 | [Squid · condições e etapas de pagamento](https://meajuda.squid.com.br/v1/docs/como-funciona-o-pagamento-feito-pela-squid-creators) |
| 4 | [UGC Planner · recursos e planos divulgados](https://ugcplanner.com/features) |
| 5 | [Passionfroot · calendário, pacotes e pagamentos](https://help.passionfroot.me/en/articles/11552873-faqs) |
| 6 | [Comunidade UGCcreators · ferramentas para prazos e pagamentos](https://www.reddit.com/r/UGCcreators/comments/1ros46o/ugc_creators_how_do_you_keep_track_of_brand_deals/) |
| 7 | [Comunidade UGCcreators · combinação de Notion, Gmail e planilhas](https://www.reddit.com/r/UGCcreators/comments/1p0ei0b/guys_how_are_you_keeping_track_of_brand_deals/) |
| 8 | [Comunidade UGCcreators · relato sobre cobrança e prazo](https://www.reddit.com/r/UGCcreators/comments/1smzzn4/outstanding_payments/) |
| 9 | [Postiz · repositório e licença](https://github.com/gitroomhq/postiz-app) |
| 10 | [Kanboard · repositório e licença](https://github.com/kanboard/kanboard) |
| 11 | [Meta · conta profissional Instagram](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/v21.0/) |
| 12 | [Meta · referências de Insights por recurso](https://developers.facebook.com/docs/insights/references) e [níveis de acesso](https://developers.facebook.com/docs/insights/overview) |
| 13 | [TikTok · acesso à Display API](https://developers.tiktok.com/doc/display-api-get-started) |
| 14 | [TikTok · campos do objeto de vídeo](https://developers.tiktok.com/docs/en/tiktok-api-v2-video-object) |
| 15 | [TikTok for Business · autorizações de Spark Ads](https://ads.tiktok.com/resources/help/article/spark-ads) |
| 16 | [Google · consultas em YouTube Analytics](https://developers.google.com/youtube/analytics/reference/reports/query) |
| 17 | [Google · políticas para desenvolvedores YouTube](https://developers.google.com/youtube/terms/developer-policies/) e [armazenamento e métricas derivadas](https://developers.google.com/youtube/terms/derived-metrics-policy) |
| 18 | [ANPD · segurança da informação para agentes de pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte) |
| 19 | [CONAR · guia de marketing e publicidade por influenciadores digitais](https://www.conar.org.br/noticias/guia-de-marketing-e-publicidade-por-influenciadores-digitais) |
| 20 | [GNU · texto da AGPL v3, incluindo seção 13](https://www.gnu.org/licenses/agpl-3.0.en.html) |
