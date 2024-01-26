// Arrays Iniciais
let listas = [
   {
      id: 1,
      nomeLista: 'Trabalho',
      corLista: 'red'
   },
   {
      id: 2,
      nomeLista: 'Casa',
      corLista: 'yellow'
   }
];

let tarefas = [
   {
      id: 1,
      idListaVinculada: 1,
      tituloTarefa: 'Tarefa Teste 01',
      tarefaConcluida: false
   },
   {
      id: 2,
      idListaVinculada: 1,
      tituloTarefa: 'Tarefa Teste 02',
      tarefaConcluida: false
   },
   {
      id: 3,
      idListaVinculada: 1,
      tituloTarefa: 'Tarefa Teste 03',
      tarefaConcluida: false
   }
];


// Variaveis Inicias

// Contador das Listas
let listsCounter = 0;
// Elemento Contador das Listas
const listCounterElement = document.querySelector('#listsCounter');
// Elemento Container Listas
const listsContainer = document.querySelector('#listsContainer');
// Elemento Input Nome Nova Lista
const newListNameInputElement = document.getElementById('newListNameInput');
// Elemento Input Cor Nova Lista
const selectedColorListInputElement = document.getElementById('selectedColorListInput');
// Elemento Cor Nova Lista
const selectedColorListElement = document.getElementById('selectedColorList');


// Funções
function renderizarListasTarefas() {
   
   // Iniciando Contador das Listas
   listsCounter = listas.length;
   listCounterElement.innerHTML = listsCounter;

   // Renderizando listas criadas
   listas.forEach( 
      lista => {
         const listItem = document.createElement('li');

         listItem.innerHTML = `
            <div 
               class="flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-100 h-10 transition-all duration-300"
               >
               <button class="flex items-center justify-start w-full space-x-2">
                  <div class="w-4 h-4 rounded bg-${lista.corLista}-400"></div>
                  <p class="font-medium text-xs">${lista.nomeLista}</p>
               </button>
               <button 
                  class="flex items-center justify-center w-6 h-6 rounded-md hover:text-sky-500 transition-all duration-300 text-neutral-500"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
               </button>
            </div>
         `
         listsContainer.appendChild(listItem);
      }
   )
}

function mostrarModalAcaoLista() {

   const modalElement = document.getElementById('modalActionsLists');
   newListNameInputElement.value = '';
   selectedColorListInputElement.value = 'neutral';

   modalElement.classList.remove('hidden');
   setTimeout(() => {
      modalElement.classList.remove('opacity-0');
      modalElement.classList.remove('-right-[250px]'); 
      modalElement.classList.add('-right-[285px]');
   }, 200);
}

function fecharModalAcaoLista() {

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
   const listaNovaNome = document.getElementById('newListNameInput').value;
   const corListaNova = document.getElementById('selectedColorListInput').value;

   // Adiciona a Lista na Array
   listas.push({ id: idListaNova , nomeLista: listaNovaNome, corLista: corListaNova });

   // Fecha o Modal e recarrega as listas no DOM
   fecharModalAcaoLista();

   listsCounter = listas.length;
   listCounterElement.innerHTML = listsCounter;
   
   // Adiciona Nova Lista no DOM
   const listaNova = document.createElement('li');

   listaNova.innerHTML = `
      <div 
         class="flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-100 h-10 transition-all duration-300"
         >
         <button class="flex items-center justify-start w-full space-x-2">
            <div class="w-4 h-4 rounded bg-${corListaNova}-400"></div>
            <p class="font-medium text-xs">${listaNovaNome}</p>
         </button>
         <button 
            class="flex items-center justify-center w-6 h-6 rounded-md hover:text-sky-500 transition-all duration-300 text-neutral-500"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
         </button>
      </div>
   `;

   listsContainer.appendChild(listaNova);
   console.log(listas);

}

function corNovaLista() {
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

// Renderizando listas
document.addEventListener('DOMContentLoaded', () => {
   // Chamando função de rendização das listas de tarefas no carregamento da pag.
   renderizarListasTarefas();
});

// Botão abrir modal de criação de listas
document.getElementById('createListButton').addEventListener('click', () => {
   mostrarModalAcaoLista();
});

// Botão fechar modal de criação de listas
document.getElementById('closeModalActionsLists').addEventListener('click', () => {
   fecharModalAcaoLista();
});

