---
title: EMBL.org
subtitle: No EMBL.org homepage, yet.
date: 2018-08-22 12:24:50
is_index: true
layout: layouts/base.njk
embl_content_meta_properties:
  who: EMBL.org
  what: EMBL.org
  where: EMBL
  active: who
  utility: tocome
  reach: tocome
  maintainer: tocome
  lastreview: tocome
  reviewcycle: tocome
  expiry: tocome
---



{% render '@vf-intro', {"vf_intro_phase": "beta", "vf_intro_heading": title,
  "vf_intro_lede": siteConfig.siteInformation.short_description+"",
  "vf_intro_text": [
    "Welcome to the in-development EMBL.org homepage."
  ]
} %}




<section class="embl-grid embl-grid--has-centered-content">
  <div></div>
  <div class="vf-content">
    {# show all pages classes as sections #}
    {%- for section in collections.sections %}
      {% if section.data.is_index ==  true %}
        {% set absolutePostUrl %}{{ metadata.id }}{{ section.url }}{% endset %}

## [{{ section.data.title }}]({{ absolutePostUrl }})

{{ section.data.subtitle }}

      {% endif %}
    {%- endfor %}
  </div>
</section>
