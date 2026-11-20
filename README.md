# Pauta Creator

Painel de trabalho para creators que produzem UGC para marcas e publicam campanhas no Instagram, TikTok e YouTube.

O piloto permite cadastrar contas e plataformas, acompanhar candidaturas, organizar entregas e conferir o saldo de cada campanha.

O [blueprint do produto](docs/blueprint.md) reúne a pesquisa de mercado, as telas, o modelo de dados, o plano de integrações e o roadmap com critérios de aceite.

## Licença

[GNU Affero General Public License v3.0](LICENSE) (`AGPL-3.0-only`).

## Testar o piloto

O piloto é um aplicativo estático na pasta `public`. Ele abre um espaço de demonstração com campanhas fictícias. Para testar com seus cadastros, escolha **Meu estúdio** no cabeçalho. Cada navegador guarda seus dados localmente. O endereço de preview, o site de produção e o celular têm bases independentes. Limpar os dados do navegador apaga os registros locais.

1. Em **Cadastros**, adicione uma conta e uma plataforma, e marque as contas inscritas.
2. Em **Campanhas**, crie a primeira candidatura. Escolha conta, plataforma e situação, registre o briefing e o cachê. Para UGC privado, selecione **UGC para a marca**.
3. Na ficha, adicione duas entregas com prazos diferentes. Confira **Hoje** e **Agenda**, atualize a situação e cole o link da versão enviada.
4. Registre um recebimento parcial, abra **Financeiro** e confira o saldo. Recarregue a página para verificar a persistência.

Para rodar localmente, execute `python -m http.server 8000 --directory public` na raiz e abra `http://localhost:8000`.

## Deploy no Netlify

Importe este repositório pela integração GitHub do Netlify. Selecione a branch com o piloto (após o merge, use `main`). Deixe a pasta base e o comando de build vazios. A pasta de publicação é `public`, configurada em `netlify.toml`. O app usa navegação por hash, inclusive nos links diretos de campanha. O preview de uma PR exige que o projeto esteja conectado no Netlify e os Deploy Previews estejam ativos.

### Alcance desta versão

Há uma conta e uma origem por campanha, com várias entregas e baixas em reais. O saldo considera o cachê confirmado e os recebimentos lançados. O teste inicial usa links para arquivos. Use dados fictícios durante a avaliação. Login, compartilhamento entre usuários, cópia de segurança no servidor, armazenamento de contratos e códigos sigilosos, estornos e coleta de analytics são etapas posteriores do blueprint.
