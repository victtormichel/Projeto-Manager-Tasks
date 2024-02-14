// Variaveis Iniciais
let listas = [
   {
      id: 1,
      nomeLista: 'Trabalho',
      corLista: 'red',
      tarefas: [
         {
            id: 1,
            tituloTarefa: 'Tarefa Teste 01',
            tarefaConcluida: false
         },
         {
            id: 2,
            tituloTarefa: 'Tarefa Teste 02',
            tarefaConcluida: false
         },
      ],
      tarefasQuantidade: 2
   },
   {
      id: 2,
      nomeLista: 'Casa',
      corLista: 'yellow',
      tarefas: [
         {
            id: 1,
            tituloTarefa: 'Tarefa Teste 01',
            tarefaConcluida: false
         },
      ],
      tarefasQuantidade: 1
   }
];



// Contador das Listas
let listsCounter = 0;
// Elemento Contador das Listas
const listCounterElement = document.querySelector('#listsCounter');
// Elemento Container Listas
const listsContainer = document.getElementById('listsContainer');
// Elemento Container Tarefas
const tasksContainer = document.getElementById('tasksContainer');
// Elemento Container Lista Tarefas
const tasksList = document.getElementById('tasksList');
// Elemento Contador de Tarefas
const tasksCounterElement = document.getElementById('counterTasksList');
// Elemento Input Nome Nova Lista
const listNameInputElement = document.getElementById('listNameInput');
// Elemento Input Cor Nova Lista
const selectedColorListInputElement = document.getElementById('selectedColorListInput');
// Elemento Cor Nova Lista
const selectedColorListElement = document.getElementById('selectedColorList');

const listItemElement = function (lista) {
   return `
      <li id="list${lista.id}" class="w-full relative">
                     
         <!-- Lista Item -->
         <div 
            class="flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-100 h-10 transition-all duration-300"
            >
            <button onclick="renderizarDetalhesLista(${lista.id})" class="flex items-center justify-start w-full space-x-2">
               <div id="list${lista.id}ColorElement" class="w-4 h-4 rounded bg-${lista.corLista}-400"></div>
               <p id="list${lista.id}NameElement" class="font-medium text-xs">${lista.nomeLista}</p>
            </button>
            <button
               id="editListButton${lista.id}" 
               onclick="mostrarModalEditarLista(${lista.id})"
               class="flex items-center justify-center w-6 h-6 rounded-md hover:text-sky-500 transition-all duration-300 text-neutral-500"
               >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
            </button>
         </div>

         <!-- Modal Editar Lista -->
         <div 
            id="editList${lista.id}Modal" 
            class="absolute bg-white rounded-lg shadow-md top-0 -right-[250px] opacity-0 hidden z-20 p-3 space-y-4 transition-all duration-300"
            >
            <!-- Header Modal -->
            <div class="flex items-center justify-between">
               <p class="text-sm text-neutral-700 font-medium">Editar Lista</p>
               <button id="closeModalEditList${lista.id}" onclick="fecharModalEditarLista(${lista.id})" class="rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 hover:text-sky-500 transition-all duration-200"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
               </button>
            </div>

            <!-- Input de Nome / Cor -->
            <div class="flex items-center justify-start relative">
               <div class="rounded size-3.5 bg-${lista.corLista}-500 absolute left-3"></div>
               <input 
                  id="newNameList${lista.id}Input"
                  type="text" 
                  placeholder="Nome da Lista" 
                  value="${lista.nomeLista}"
                  class="text-xs rounded-md min-w-[250px] h-9 border pl-9 pr-4 focus:border-sky-500 focus:outline-none transition-all duration-200" 
               />
            </div>

            <!-- Botão Editar / Deletar Lista -->
            <div class="flex items-center justify-center w-full space-x-2">
               <button 
                  id="editList${lista.id}Button"
                  onclick="editarLista(${lista.id})" 
                  class="w-[70%] flex items-center justify-center space-x-1.5 h-9 rounded-md text-xs font-medium bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-200"
                  >
                  <p>Salvar</p>
               </button>
               <button 
                  id="deleteList${lista.id}Button"
                  onclick="deletarLista(${lista.id})" 
                  class="w-[30%] flex items-center justify-center space-x-1.5 h-9 bg-red-500/10 text-red-500 rounded-md text-xs font-medium hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                  <p>Deletar</p>
               </button>
            </div>
         </div>

      </li>
   `;
}

const taskItemElement = function (tarefa) {
   return  `
      <li class="flex items-center justify-between hover:bg-neutral-50 transition-all duration-300 py-2 px-3 rounded-lg w-full">
         <button 
            onclick="document.getElementById('task-input').click()" 
            class="flex items-center justify-start space-x-2 focus:outline-none"
            >
            <div class="flex items-center justify-center">
               <i data-lucide="check" class="w-3 h-3 text-white absolute z-10 mt-[0.3px] stroke-[3]"></i>
               <input id="task-input" type="checkbox" class="w-4 h-4 appearance-none rounded-full border-2 border-neutral-400 checked:bg-sky-500 checked:border-transparent transition-all duration-100 hover:cursor-pointer"/>
            </div>
            <p>Nome da Tarefa 01</p>
         </button>
         <div class="flex items-center justify-end space-x-2">
            <!-- Deletar Tarefa-->
            <button class="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 hover:bg-red-500 group transition-all duration-300">
               <i data-lucide="trash" class="w-4 h-4 text-red-500 group-hover:text-white transition-all duration-200"></i>
            </button>

            <!-- Editar Tarefa-->
            <button class="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-500/10 hover:bg-sky-500 group transition-all duration-300">
               <i data-lucide="pencil" class="w-4 h-4 text-sky-500 group-hover:text-white transition-all duration-200"></i>
            </button>
         </div>
      </li>
   `
}

// Funções
function renderizarListasTarefas() {
   // Limpando Listas caso haja alguma no DOM
   listsContainer.innerHTML = "";

   // Iniciando Contador das Listas
   listsCounter = listas.length;
   listCounterElement.innerHTML = listsCounter;

   // Renderizando listas
   listsContainer.innerHTML = listas.map( 
      (lista) => {
         return listItemElement(lista)
      }
   ).join('');

}

function renderizarTarefas(idLista) {
   // Limpando Tarefas caso haja alguma no DOM
   tasksList.innerHTML = "";

   // Iniciando Contador de Tarefas
   tasksCounter = listas[idLista - 1].tarefas.length;
   tasksCounterElement.innerHTML = tasksCounter;

   // Renderizando Tarefas
   tasksList.innerHTML = listas[idLista - 1].tarefas.map (
      (tarefa) => {
         return taskItemElement(tarefa)
      }      
   ).join('');

}

function mostrarModalCriarLista() {

   const modalElement = document.getElementById('modalActionsLists');
   listNameInputElement.value = '';
   selectedColorListInputElement.value = 'neutral';

   modalElement.classList.remove('hidden');
   setTimeout(() => {
      modalElement.classList.remove('opacity-0');
      modalElement.classList.remove('-right-[250px]'); 
      modalElement.classList.add('-right-[285px]');
   }, 200);
}

function fecharModalCriarLista() {

   const modalElement = document.getElementById('modalActionsLists');
   modalElement.classList.remove('-right-[285px]');
   modalElement.classList.add('-right-[250px]');
   modalElement.classList.add('opacity-0');
   setTimeout(() => {
      modalElement.classList.add('hidden');
   },300);

}

function criarNovaLista() {
   
   // Pega nome e cor da lista criada
   const idListaNova = listas.length + 1;
   const listaNovaNome = document.getElementById('listNameInput').value;
   const corListaNova = document.getElementById('selectedColorListInput').value;

   // Adiciona a Lista na Array
   listas.push({ id: idListaNova , nomeLista: listaNovaNome, corLista: corListaNova });

   // Fecha o Modal e recarrega as listas no DOM
   fecharModalCriarLista();

   // Renderiza as Listas Novamente
   renderizarListasTarefas();

}

function criarNovaTarefa(id) {
   const idNovaTarefa = listas[id - 1].tarefas.id;
   const tarefaNovaNome = `Tarefa ${ listas[id - 1].tarefas.length + 1 }`;

}

function mostrarModalEditarLista(id) {
   const modalElement = document.getElementById('editList'+id+'Modal');

   modalElement.classList.remove('hidden');
   setTimeout(() => {
      modalElement.classList.remove('opacity-0');
      modalElement.classList.remove('-right-[250px]'); 
      modalElement.classList.add('-right-[285px]');
   }, 200);
}

function fecharModalEditarLista(id) {

   const modalElement = document.getElementById('editList'+id+'Modal');
   modalElement.classList.remove('-right-[285px]');
   modalElement.classList.add('-right-[250px]');
   modalElement.classList.add('opacity-0');
   setTimeout(() => {
      modalElement.classList.add('hidden');
   },300);

}

function editarLista(id) {

   const listIndex = id - 1;
   const newNameList = document.getElementById('newNameList'+id+'Input').value;
   const elementNameList = document.getElementById('list'+id+'NameElement');

   listas[listIndex].nomeLista = newNameList;
   elementNameList.innerHTML = newNameList;

   fecharModalEditarLista(id);

}

function deletarLista(id) {

   const indexListItem = id - 1;

   fecharModalEditarLista(id);

   // Deleta a Lista
   listas.splice(indexListItem,  1);

   // Renderiza as Listas Novamente
   renderizarListasTarefas();

}

function trocarCorLista() {
   const novaCorElemento = 'bg-' + selectedColorListInputElement.value + '-500' 

   if (selectedColorListElement.classList.contains('bg-neutral-500')) {
      selectedColorListElement.classList.remove('bg-neutral-500');
      selectedColorListElement.classList.add(novaCorElemento);
   } else if (selectedColorListElement.classList.contains('bg-red-500')) {
      selectedColorListElement.classList.remove('bg-red-500');
      selectedColorListElement.classList.add(novaCorElemento);
   } else if (selectedColorListElement.classList.contains('bg-yellow-500')) {
      selectedColorListElement.classList.remove('bg-yellow-500');
      selectedColorListElement.classList.add(novaCorElemento);
   } else if (selectedColorListElement.classList.contains('bg-green-500')) {
      selectedColorListElement.classList.remove('bg-green-500');
      selectedColorListElement.classList.add(novaCorElemento);
   } else if (selectedColorListElement.classList.contains('bg-sky-500')) {
      selectedColorListElement.classList.remove('bg-sky-500');
      selectedColorListElement.classList.add(novaCorElemento);
   } else if (selectedColorListElement.classList.contains('bg-indigo-500')) {
      selectedColorListElement.classList.remove('bg-indigo-500');
      selectedColorListElement.classList.add(novaCorElemento);
   }

}

function renderizarDetalhesLista(id) {

   const listaObjeto = listas[id - 1]
   document.getElementById('listTitle').innerHTML = listaObjeto.nomeLista

   const tarefasContainer = document.getElementById('tasksContainer')
   tarefasContainer.classList.remove('opacity-0', '-translate-x-5')

   document.getElementById("createTaskButton").setAttribute("onclick", `criarNovaTarefa(${id})`);
   document.getElementById("clearListTaskButton").setAttribute("onclick", `limparTarefa(${id})`);

   renderizarTarefas(id)

}

// Renderizando listas
document.addEventListener('DOMContentLoaded', () => {
   // Chamando função de rendização das listas de tarefas no carregamento da pag.
   renderizarListasTarefas();
});