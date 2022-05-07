export const getSpinnerComponent = ({ isSmall = false, noPadding = false }) => {
    return `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>`;
};

export const getPostCardComponent = ({ author: user, content }) => {
    return `<div class="bg-white rounded-md px-4 py-3" x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-90"
    x-transition:enter-end="opacity-100 scale-100" >
                    <div class="pb-4 flex items-center gap-2 justify-center border-b border-b-slate-50">
                        <div>
                            <img src="${user.image}" alt="" class="rounded-full w-10 h-10 block overflow-hidden">
                        </div>
                        <div class="flex-1">
                            <h5 class="text-slate-800 font-bold">${user.name}</h5>
                            <span class="text-slate-600">${user.createdAt}</span>
                        </div>
                    </div>
                    <div class="py-4 content">
                        ${content}
                    </div>
                    <div>
                        <div x-data="{ animate: false }">
                            <button x-on:mouseenter="animate=true" x-on:mouseleave="animate=false"
                                class="py-2 px-5 hover:bg-slate-100 transition rounded flex items-center justify-center gap-1 font-semibold text-md text-slate-600">
                                <i class="bx " :class="animate ? 'bxs-like bx-tada text-red-500' : 'bx-like'"></i>
                                <span>Like</span>
                            </button>
                        </div>
                    </div>
                </div>`;
};

export const getPlaceholderPostCardComponent = () => {
    return `<div class="animate-pulse bg-white rounded-md px-4 py-3">
    <div class="pb-4 flex items-center gap-2 justify-center border-b border-b-slate-50 py-2">
        <div>
            <div class="rounded-full bg-slate-100 w-10 h-10 block overflow-hidden">
            </div>
        </div>
        <div class="flex-1">
            <h5 class="p-2 rounded-md bg-slate-100 w-64 mb-2 max-w-full"></h5>
            <span class="block p-2 rounded-md bg-slate-100 w-52 max-w-full"></span>
        </div>
    </div>
    <div class="py-4">
        <span class="block p-2 rounded-md bg-slate-100 w-96 max-w-full mb-2"></span>
        <span class="block p-2 rounded-md bg-slate-100 w-80 max-w-full mb-2"></span>
        <span class="block p-2 rounded-md bg-slate-100 w-72 max-w-full mb-2"></span>
    </div>
    <div>
        <span class="block p-2 rounded-md bg-slate-100 w-52 max-w-full"></span>
    </div>
</div>`;
};
