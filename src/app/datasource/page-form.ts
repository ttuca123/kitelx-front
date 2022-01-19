export class PageForm {

    content: [];

    pageable = {
        sort : {
            'sorted' :  false,
            'unsorted': false,
            'empty': false
        },
        offset: 0,
        pageSize: 0,
        pageNumber: 0,
        paged: false,
        unpaged: false,
    };

    totalPages = 0; // Total de páginas exibidas
    totalElements = 0; // Total Geral de Elementos
    last = false;
    size = 25; // Quantidade de registros exibidos na página
    number = 0;
    sort = {
        'sorted' :  false,
        'unsorted': false,
        'empty': false
    };
    numberOfElements = 0;
    first = false;
    empty = false;
    options = [10, 25, 50];
}
