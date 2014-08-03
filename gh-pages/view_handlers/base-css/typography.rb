require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Typography
    include ViewHandlers::Layouts::Docs

    page_title{ 'Base CSS: Typography' }

    def run!
      render 'base-css/typography.html'
    end

  end

end
