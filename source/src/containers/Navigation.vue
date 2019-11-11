<template>
  <div id="menucover">
    <div class="container maintopmenu" id="topmenu">
      <label for="show-menu" class="show-menu">
        <i class="glyphicon glyphicon-menu-hamburger"></i>
      </label>
      <input type="checkbox" id="show-menu" role="button">
      <ul class="row" id="menu">
        <router-link :to="{ path: '/menu1'}">
          <li class="col-md-1-9 col-sm-1-9">메뉴1</li>
        </router-link>
        <router-link :to="{ path: '/menu2'}">
          <li class="col-md-1-9 col-sm-1-9">메뉴2</li>
        </router-link>
        
      </ul>
      <div id="subcover">
        <ul class="container dropdown-content">
          <li class="col-md-1-9 col-sm-1-9 col-xs-1-9">
            <ul>
              <router-link :to="{ path: '/menu1/sub1'}">
                <li>서브메뉴1</li>
              </router-link>
              <router-link :to="{ path: '/menu1/sub2'}">
                <li>서브메뉴2</li>
              </router-link>
            </ul>
          </li>
          <li class="col-md-1-9 col-sm-1-9 col-xs-1-9">
            <ul>
              <router-link :to="{ path: '/menu2/sub1'}">
                <li>서브메뉴1</li>
              </router-link>
              <router-link :to="{ path: '/menu2/sub2'}">
                <li>서브메뉴1</li>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

