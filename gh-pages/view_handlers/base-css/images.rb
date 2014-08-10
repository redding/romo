require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Images
    include ViewHandlers::Layouts::Docs

    script 'js/holder.js'
    page_title{ 'Images | CSS' }

    def run!
      render 'base-css/images.html'
    end

  end

end
