// const extraMap = new Map([
//   ['Top rated', [(movies) => movies.slice().sort((a, b) => b.rating - a.rating)]],
//   ['Most commented', [(movies) => movies.slice().sort((a, b) => b.comments - a.comments)]]
// ]);
//
// const generateExtraBlocks = (movies) => Object.entries(extraMap).map(([blockName, sortedList]) => ({
//   name: blockName,
//   moviesList: sortedList(movies),
//   }),
// );
//
// const createExtraBlocks = (blocks) => {
//   const {name, movieList} = blocks;
//
//   return (`<section class="films-list films-list--extra">
//     <h2 class="films-list__title">Top rated</h2>
//     <div class="films-list__container">
//
//     </div>
//   </section>`
//   );
// };
//
