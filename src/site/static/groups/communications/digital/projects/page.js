/**
 * Finds all trello lists on a page and activates them
 * @example <div data-embl-js-trellolist data-embl-js-trellolist-id="5c336397daf980224666c2be" data-embl-js-trellolist-name="Consultation"></div>
 * @example emblGetTrelloLists()
 */
function emblGetTrelloLists() {
  const emblTrelloLists = document.querySelectorAll('[data-embl-js-trellolist]');
  if (!emblTrelloLists) {
    // exit: lists not found
    return;
  }
  if (emblTrelloLists.length == 0) {
    // exit: lists not found
    return;
  }

  var dashboardTemplate = `<section class="vf-summary-container | embl-grid">
      <div class="vf-section-header">
        <h2 class="vf-section-header__heading">{{ name }}</h2>
      </div>
      <div>
        <div class="vf-section-content | vf-grid vf-grid__col-3">
          {{#each this}}
          <article class="vf-summary trello-{{id}}">
            <h3 class="vf-summary__title vf-text vf-text--heading-l">
              {{#if customFieldItems}}
              <a class="vf-link" href="{{#each customFieldItems}}{{this.value.text}}{{/each}}">{{name}}</a>
              {{else}}
                 {{name}}
              {{/if}}
              {{#each labels}}
                <div class="vf-badge vf-badge--primary" aria-label="{{this.name}}"> {{this.name}} </div>
              {{/each}}
            </h3>

            <div class="vf-summary__text vf-text vf-text--body-r">{{stripTags desc}}</div>
            <a class="vf-link" href="{{url}}">Edit</a>
          </article>
          {{/each}}
        </div>
      </div>

    </section>

    <hr class="vf-divider">
  `;

  Handlebars.registerHelper("mdToHtml", function(md, options) {
    return new Handlebars.SafeString(marked(md));
  });

  Handlebars.registerHelper("stripTags", function(string, options) {
    return new Handlebars.SafeString(marked(string).replace(/(<([^>]+)>)/ig,""));
  });

  // Fetch the trello data
  // Api doc: https://developers.trello.com/reference/#boardsboardid-1
  // Board: https://trello.com/b/9olFTE3o/digital-project-dashboard
  // List: https://api.trello.com/1/lists/5c3362c941fd3e51e861750a/cards
  function getTrelloList(listId,name) {
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var data = JSON.parse(this.responseText);
        renderDashboard(data,listId,name);
      }
    });

    // xhr.open("GET", "https://api.trello.com/1/boards/9olFTE3o?actions=all&boardStars=none&cards=all&card_pluginData=false&checklists=none&customFields=false&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false");
    xhr.open("GET", "https://api.trello.com/1/lists/"+listId+"/cards?customFieldItems=true&fields=name,desc,labels,url,id");

    xhr.send(data);
  }

  function renderDashboard (data,listId,name) {
    var source = dashboardTemplate;
    var template = Handlebars.compile(source);
    data.name = name;
    targetHtml = document.querySelectorAll('[data-embl-js-trellolist-id="'+listId+'"]');
    $(targetHtml).before(template(data));
    $(targetHtml).hide();
  }

  Array.prototype.forEach.call(emblTrelloLists, (list, i) => {
    // getTrelloList('5c3362c941fd3e51e861750a','not-started','Not started');
    getTrelloList(list.dataset.emblJsTrellolistId,list.dataset.emblJsTrellolistName);
  });
}

emblGetTrelloLists();
