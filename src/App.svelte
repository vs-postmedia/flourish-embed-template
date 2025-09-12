<script>
    // CSS
    import normalize from './css/normalize.css';
    import postmedia from './css/postmedia.css';
    import colours from './css/colors.css';
    import fonts from './css/fonts.css';
    import css from './css/main.css';

    // IMAGES
    import gfx from '/img/map.jpg';

    // SET CHART HEIGH & URL HERE...
    const chartId01 = '5258140';
    const chartId02 = '5258446';
    const chartHeight = '375px';
    const fullWidthId = '25071549'
    const fullWidthHeight = '300px';
</script>

<!-- MARKUP -->
<header>
    <h1>HED</h1>
    <p class="subhead">TK TK TK</p>
</header>

<!-- SIDE-BY-SIDE -->
<div class="graphic-container">
    <iframe src='https://flo.uri.sh/visualisation/{chartId01}/embed' title='Interactive or visual content' frameborder='0' scrolling='no' style='width:100%;height:{chartHeight};' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
    <iframe src='https://flo.uri.sh/visualisation/{chartId02}/embed' title='Interactive or visual content' frameborder='0' scrolling='no' style='width:100%;height:{chartHeight};' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
</div>

<!-- FULL WIDTH -->
<div class="graphic-container full-width">
    <iframe src='https://flo.uri.sh/visualisation/{fullWidthId}/embed' title='Interactive or visual content' frameborder='0' scrolling='no' style='width:100%;height:{fullWidthHeight};' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
</div>

<!-- IMAGES -->
 <div class="image-container">
    <img src={gfx} alt="data visualization"/>
 </div>

<footer>
    <p class="source">Source:
        <a href="https://www.vancouversun.com/" target="_blank">tk</a>,
        <a href="https://www.openstreetmap.org/" target="_blank">tk</a>
    </p>
    <!-- flourish logo -->
    <div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/3706064/?utm_source=embed&utm_campaign=visualisation/3706064' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>
</footer>

<!-- CSS -->
<style>
    /* STEPS */
    section {
        position: relative;
    }
    .sticky { 
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        position: sticky;
        top: 5vh;
        z-index: 1;
    }
    .chart .no-pointer {
        pointer-events: none;
    }
    .steps {
        margin-top: -100%;
        position: relative;
        z-index: 2;
    }
</style>